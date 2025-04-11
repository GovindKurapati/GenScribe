"use client";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Field,
  VStack,
  Button,
  Portal,
  Select,
  createListCollection,
  Slider,
  Spinner,
} from "@chakra-ui/react";

export const BlogGenerator = ({ blogData }) => {
  const [topic, setTopic] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBlog = async () => {
    // if (!topic) return alert("Enter a topic first!");
    setLoading(true);
    try {
      const data = {
        topic: topic,
        tone: selectedTone,
        wordLimit: wordLength * 10,
      };
      const response = await axios.post("/api/blog", { data });
      blogData(response.data.content);
    } catch (error) {
      console.error("Error generating blog:", error);
    }
    setLoading(false);
  };

  const tones = createListCollection({
    items: [
      { label: "Formal", value: "formal" },
      { label: "Casual", value: "casual" },
      { label: "Professional", value: "professional" },
      { label: "Informative", value: "informative" },
    ],
  });

  const [selectedTone, setSelectedTone] = useState("");

  const [wordLength, setWordLength] = useState(10);

  return (
    <Box mx="auto" p={6} borderWidth="1px" borderRadius="lg" shadow="lg">
      <VStack spacing={8} align="stretch" gap={"40px"}>
        <Field.Root>
          <Field.Label>Blog Topic</Field.Label>
          <Input
            placeholder="Enter blog topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Select Tone & Style</Field.Label>
          <Select.Root
            collection={tones}
            size="sm"
            width="320px"
            onValueChange={(value) => setSelectedTone(value)}
            defaultValue={["formal"]}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Choose tone & style" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {tones.items.map((tone) => (
                    <Select.Item item={tone} key={tone.value}>
                      {tone.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Word Length</Field.Label>
          <Slider.Root
            width="200px"
            defaultValue={[10]}
            step={10}
            onValueChange={(e) => setWordLength(e.value[0])}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
          <Box mt={2}>Selected Word Length: {wordLength * 10}</Box>
        </Field.Root>

        <Button
          colorScheme="blue"
          size="md"
          onClick={generateBlog}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : ""}
          {loading ? "Generating..." : "Generate Blog"}
        </Button>
      </VStack>
    </Box>
  );
};
