/* eslint-disable react/no-deprecated */
import React from "react";
import { Select, Button, Flex, Card } from "@sanity/ui";
import styles from "./TextToSpeechPreview.module.css";

const defaultFields = ["title", "excerpt", "body"];
const speechOptions = { rate: 0.9, pitch: 1, lang: "en-US" };

let speechSynth: any = null;

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  speechSynth = window.speechSynthesis;
}

const blocksToText = (blocks, opts = {}) => {
  const defaultBehaviors = { nonTextBehavior: "remove" };
  const options = Object?.assign({}, defaultBehaviors, opts);
  return blocks
    ?.map((block) => {
      if (block?._type !== "block" || !block?.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }
      return block?.children?.map((child) => child?.text).join("");
    })
    .join("\n\n");
};

// eslint-disable-next-line react/require-optimization
function TextToSpeechPreview(props) {
  const { document, options } = props;
  const { displayed } = document;
  const [activeField, setActiveField] = React.useState(null);

  // Only offer to speak fields which have any data
  const fieldsAvailableForUtterance = () => {
    const { fields } = options;
    return (fields || defaultFields).filter((field) => !!displayed[field]);
  };

  React.useEffect(() => {
    // on component mount
    setActiveField(fieldsAvailableForUtterance()[0]);

    if (speechSynth.speaking) {
      handleStopSpeaking();
      handleStartSpeaking();
    }

    // on component unmount
    return () => {
      handleStopSpeaking();
    };
  }, []);

  const textToSpeak = () => {
    if (typeof displayed[activeField] === "string") {
      return displayed[activeField];
    }
    // we're in Portable Text now, digging into blocks
    return blocksToText(displayed[activeField]);
  };

  const handleFieldChange = (field) => {
    speechSynth.cancel();
    setActiveField(field.title);
  };

  const handleStartSpeaking = () => {
    const { pitch, rate, lang } = speechOptions;
    // eslint-disable-next-line no-undef
    const utterance = new SpeechSynthesisUtterance(textToSpeak());
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.lang = lang;
    speechSynth.speak(utterance);
  };

  const handleStopSpeaking = () => {
    speechSynth.cancel();
  };

  if (!speechSynth) {
    return (
      <div className={styles.wrapper}>
        Unfortunately your browser does not support the Web Speech API.
      </div>
    );
  }

  // DefaultSelect wants objects, let's make some of those
  const fieldObjects = fieldsAvailableForUtterance().map((field) => ({
    title: field,
  }));

  const activeFieldObject = fieldObjects.find(
    (obj) => obj.title === activeField
  );

  if (fieldObjects) {
    return (
      <div className={styles.wrapper}>
        <Flex>
          <Select padding={[2, 3, 3]} fontSize={3} onChange={handleFieldChange}>
            {fieldObjects?.map((field, index) => (
              <option key={index} value={activeFieldObject}>
                {field?.title}
              </option>
            ))}
          </Select>
          <Card marginX={2}>
            <Flex>
              <Button
                mode="default"
                tone="primary"
                type="button"
                onClick={handleStartSpeaking}
              >
                Play
              </Button>
              <Button
                mode="default"
                type="button"
                onClick={handleStopSpeaking}
                style={{
                  backgroundColor: "#f03e2f",
                  color: "#fff",
                  borderColor: "transparent",
                }}
              >
                Stop
              </Button>
            </Flex>
          </Card>
        </Flex>
        <h3 className={styles.transcriptHeading}>Transcript</h3>
        <p className={styles.transcriptBody}>{textToSpeak()}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      The <code>options</code> constant defines which fields can be uttered.
      Make sure the current document has a value for these fields.
    </div>
  );
}

export default TextToSpeechPreview;
