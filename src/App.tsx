import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
  Grid,
  GridItem,
  VStack,
  InputLeftAddon,
  Wrap,
  WrapItem,
  Center,
  Divider,
  IconButton,
  Spacer,
  ButtonGroup,
  Textarea,
} from "@chakra-ui/react";
import {
  VscChevronRight,
  VscFolderOpened,
  VscGist,
  VscRepoPull,
} from "react-icons/vsc";
import { BsGithub } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BiBox, BiDownload } from "react-icons/bi";
import { BiPaperPlane } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import useStorage from "use-local-storage-state";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import languages from "./languages.json";
import pointerRaw from "../infra/src/pointer.rs?raw";
import sample1Raw from "/sample1.txt?raw";
import sample2Raw from "/sample2.txt?raw";
import animals from "./animals.json";
import Pointer, { UserInfo } from "./pointer";
import useHash from "./useHash";
import ConnectionStatus from "./ConnectionStatus";
import User from "./User";
import mytheme from "./const";

function getWsUri(id: string) {
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
    window.location.host +
    `/api/socket/${id}`
  );
}

function generateName() {
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
}

function generateHue() {
  return Math.floor(Math.random() * 360);
}

const noteItems = { "sample1.md": sample1Raw, "sample2.md": sample2Raw };

function App() {
  const toast = useToast();
  const [language, setLanguage] = useState("plaintext");
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [users, setUsers] = useState<Record<number, UserInfo>>({});
  const [name, setName] = useStorage("name", generateName);
  const [hue, setHue] = useStorage("hue", generateHue);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [darkMode, setDarkMode] = useStorage("darkMode", () => false);
  const pointer = useRef<Pointer>();
  const id = useHash();

  useEffect(() => {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.setValue("");
      model.setEOL(0); // LF
      pointer.current = new Pointer({
        uri: getWsUri(id),
        editor,
        onConnected: () => setConnection("connected"),
        onDisconnected: () => setConnection("disconnected"),
        onDesynchronized: () => {
          setConnection("desynchronized");
          toast({
            title: "Desynchronized with server",
            description: "Please save your work and refresh the page.",
            status: "error",
            duration: null,
          });
        },
        onChangeLanguage: (language) => {
          if (languages.includes(language)) {
            setLanguage(language);
          }
        },
        onChangeUsers: setUsers,
      });
      return () => {
        pointer.current?.dispose();
        pointer.current = undefined;
      };
    }
  }, [id, editor, toast, setUsers]);

  useEffect(() => {
    if (connection === "connected") {
      pointer.current?.setInfo({ name, hue });
    }
  }, [connection, name, hue]);

  async function handleCopy() {
    await navigator.clipboard.writeText(`${window.location.origin}/#${id}`);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  function handleLoadSample(content: string) {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.pushEditOperations(
        editor.getSelections(),
        [
          {
            range: model.getFullModelRange(),
            text: content,
          },
        ],
        () => null
      );
      editor.setPosition({ column: 0, lineNumber: 0 });
    }
  }

  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "footer main"`}
      gridTemplateRows={"30px 1fr 0.4fr"}
      gridTemplateColumns={"0.15fr 1fr"}
      h="100vh"
      gap="0"
      color={mytheme.color.shallow2dark}
    >
      <GridItem
        pl={2}
        bg={mytheme.color.deep2dark}
        area={"header"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        Pointer
      </GridItem>
      <GridItem pl={3} pr={3} pt={1} bg={mytheme.color.dark} area={"nav"}>
        <VStack spacing={3} align="stretch">
          <ConnectionStatus connection={connection} />
          <Flex
            align="center"
            wrap="wrap"
            minWidth="max-content"
            pl={2}
            transition="background-color 0.3s"
            bgColor={mytheme.color.deepdark}
          >
            <Box>
              <Text fontSize="sm" noOfLines={1} cursor="pointer">
                {`${window.location.origin}/#${id}`}
              </Text>
            </Box>
            <Spacer />
            <ButtonGroup spacing={0} variant="outline" isAttached>
              <Button
                backgroundColor="transparent"
                borderColor="transparent"
                aria-label="edit"
                _hover={{ bgColor: mytheme.color.deep2dark }}
                onClick={handleCopy}
              >
                copy
              </Button>
            </ButtonGroup>
          </Flex>
          <Heading mt={4} mb={1.5} size="sm">
            Active Users
          </Heading>
          <Stack spacing={0} mb={1.5} fontSize="sm">
            <User
              info={{ name, hue }}
              isMe
              onChangeName={(name) => name.length > 0 && setName(name)}
              onChangeColor={() => setHue(generateHue())}
              darkMode={true}
            />
            {Object.entries(users).map(([id, info]) => (
              <User key={id} info={info} darkMode={darkMode} />
            ))}
          </Stack>
          <Divider />
          <Input
            variant="unstyled"
            placeholder="Search note"
            size="sm"
            _placeholder={{ color: "inherit" }}
            bgColor={mytheme.color.shallowdark}
            mt={2}
            pl={3}
            pr={3}
            pt={1}
            pb={1}
          />
          <Wrap>
            <WrapItem>
              <Center>
                <Button size="sm" variant="solid" colorScheme="blackAlpha">
                  Import
                </Button>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Button size="sm" variant="solid" colorScheme="blackAlpha">
                  Create
                </Button>
              </Center>
            </WrapItem>
          </Wrap>
          <VStack spacing={0} align="stretch">
            {Object.entries(noteItems).map(([key, value]) => (
              <Flex
                align="center"
                wrap="wrap"
                minWidth="max-content"
                pl={2}
                transition="background-color 0.3s"
                _hover={{ bgColor: mytheme.color.deepdark }}
                key={key}
              >
                <Box>
                  <Text
                    fontSize="sm"
                    noOfLines={1}
                    maxWidth="150px"
                    onClick={() => handleLoadSample(value)}
                    cursor="pointer"
                  >
                    {key}
                  </Text>
                </Box>
                <Spacer />
                <ButtonGroup spacing={0} variant="outline" isAttached>
                  <IconButton
                    backgroundColor="transparent"
                    borderColor="transparent"
                    aria-label="edit"
                    icon={<AiOutlineEdit color="#CCCCCF" />}
                    _hover={{ bgColor: mytheme.color.deep2dark }}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    borderColor="transparent"
                    aria-label="download"
                    icon={<BiDownload color="#CCCCCF" />}
                    _hover={{ bgColor: mytheme.color.deep2dark }}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    borderColor="transparent"
                    aria-label="share"
                    icon={<BiPaperPlane color="#CCCCCF" />}
                    _hover={{ bgColor: mytheme.color.deep2dark }}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    borderColor="transparent"
                    aria-label="delete"
                    icon={<AiOutlineDelete color="#CCCCCF" />}
                    _hover={{ bgColor: mytheme.color.deep2dark }}
                  />
                </ButtonGroup>
              </Flex>
            ))}
          </VStack>
        </VStack>
      </GridItem>
      <GridItem pl={0} bg={mytheme.color.deepdark} area={"main"}>
        <Editor
          theme={"vs-dark"}
          language="text" // python, go, rust, etc
          options={{
            automaticLayout: true,
            fontSize: 13,
          }}
          onMount={(editor) => setEditor(editor)}
        />
      </GridItem>
      <GridItem pl={2} bg={mytheme.color.deep2dark} area={"footer"}>
        <Heading mt={4} mb={1.5} ml={1.5} size="sm">
          About
        </Heading>
        <Text fontSize="sm" m={1.5}>
          Pointer is a browser-based, self-hosted, fully open source mini
          Markdown notebook, written in Rust and TypeScript.
        </Text>
        <Text fontSize="sm" m={1.5}>
          Users can create new or import local Markdown files. One file can be
          edited by one user or by multiple users in real time when it's in a
          shared state.
        </Text>
        <Text fontSize="sm" m={1.5}>
          Inspired by Gist and Jupyter Notebook, users can edit, compile, and
          run inline code snippets written in multiple programming languages in
          the note.
        </Text>
        <Button
          leftIcon={<BsGithub />}
          variant="solid"
          size="sm"
          colorScheme="blackAlpha"
          m={1.5}
        >
          <a href="https://github.com/dx-han/pointer" target="_blank">
            Visit the Github repository
          </a>
        </Button>
      </GridItem>
    </Grid>
  );
}

export default App;
