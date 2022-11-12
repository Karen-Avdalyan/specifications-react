import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfigurationUI } from "../../entities/ui";
import { ConfigurationUIService } from "../../ui-service/configuration";
import { SpecificationUIService } from "../../ui-service/specification";
import { Configuration } from "../../components/configuration";
import "./index.css";
import { isAnyEmpty, getDefaultConfig } from "../../utils";

const configUIService = new ConfigurationUIService();
const specificationUIService = new SpecificationUIService();

export const CreateSpecification = ({ name }: any) => {
  const [configurations, setConfigurations] = useState<ConfigurationUI[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newConfigType, setNewConfigType] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [newConfig, setNewConfig] = useState<ConfigurationUI>(
    getDefaultConfig()
  );

  const setDefaultConfig = () => {
    const defaultConfig = getDefaultConfig();
    setNewConfig(defaultConfig);
  };

  const initialConfigs = () : ConfigurationUI[] => {
    return [
      {
        name: "Engine",
        value: "",
        type: "string",
        options: [],
      },
      {
        name: "Color",
        value: "",
        type: "options",
        options: ["red", "blue"],
      }
    ]
  };

  const possibleConfigs = useMemo(
    () => configUIService.getConfigurationTypes(),
    []
  );
  useEffect(() => {
    // We have here name for future to be able implement edit
    // `name` takes here role for identificator
    let configurations;
    if (name)
      configurations = specificationUIService.getSpecification(name);
    else
      configurations = [...specificationUIService.getConfigurations(), ...initialConfigs()];

    setConfigurations(configurations);
  }, [name]);

  const addOption = () => {
    if (!newConfig.options) {
      return;
    }
    const x = [...newConfig.options];

    x.push("");
    newConfig.options = x;
    setNewConfig((config) => ({ ...config, options: x }));
  };

  const addConfig = () => {
    const newConfiguration: ConfigurationUI = {
      name: newConfig.name,
      value: newConfig.value,
      type: newConfigType,
      options: newConfig.options,
    };

    setConfigurations([...configurations, newConfiguration]);
    setDefaultConfig();
    onClose();
  };

  const handleChangeOptionsField = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setNewConfig((config) => {
      if (config && config.options) {
        config.options[index] = event.target.value;
        config.options = [...config.options];
      }
      return { ...config };
    });
  };

  const addSpecification = () => {
    if (isAnyEmpty(configurations)) {
      setError("Please fill all fields!");
      setSuccess(false);
      return;
    }

    configurations.forEach(c => {
      if (c.type === "boolean" && c.value === "") {
        c.value = "false";
      }
    })

    specificationUIService.createSpecification(configurations);
    setDefaultConfig();
    setError("");
    setSuccess(true);
  };

  return (
    <>
      {!error ? (
        !success ? (
          ""
        ) : (
          <Alert status="success">
            <AlertIcon />
            Specification successfully added
          </Alert>
        )
      ) : (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <div style={{ margin: "5px" }}>
        {configurations &&
          configurations.length > 0 &&
          configurations.map((config: ConfigurationUI) => (
            <Configuration configuration={config} />
          ))}
      </div>
      <div>
        <Button mr={5} onClick={onOpen}>
          Add Config
        </Button>
        <Button onClick={addSpecification}>Add Specification</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Configuration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                placeholder="--- select configuration type ---"
                onChange={(e) => {
                  setNewConfigType(e.target.value);
                }}
              >
                {possibleConfigs.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Select>
              <Box sx={{ margin: "5px" }}>
                {newConfigType === "string" && (
                  <Input
                    placeholder="Text configuration name"
                    value={newConfig.name as string}
                    onChange={(e) => {
                      setNewConfig((config) => ({
                        ...config,
                        name: e.target.value,
                      }));
                    }}
                  />
                )}
                {newConfigType === "boolean" && (
                  <Input
                    placeholder="Checkbox configuration name"
                    value={newConfig.name as string}
                    onChange={(e) => {
                      setNewConfig((config) => ({
                        ...config,
                        name: e.target.value,
                      }));
                    }}
                  />
                )}
                {newConfigType === "options" && (
                  <>
                    Select Field:
                    <Input
                      placeholder="Configuration name"
                      value={newConfig.name}
                      onChange={(e) => {
                        setNewConfig((config) => ({
                          ...config,
                          name: e.target.value,
                        }));
                      }}
                    />
                    {newConfig.options &&
                      newConfig.options.map((option, index) => (
                        <Input
                          key={"option" + index}
                          placeholder={"option" + index}
                          onChange={(e) => handleChangeOptionsField(e, index)}
                        />
                      ))}
                    <Button onClick={addOption}>Add select option</Button>
                  </>
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={5} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={addConfig}>
                Add Config
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
