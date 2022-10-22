import React from "react";
import { Col, Row, Select } from "antd";
import "antd/dist/antd.css";
import { DogsSearchBySubBreed } from "../DogsSearchBySubBreed/DogsSearchBySubBreed";

const { Option } = Select;

const DogsSearchByBreed: React.FC = () => {
  const [breeds, setBreeds] = React.useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = React.useState("");
  const [deselectedBreed, setDeselectedBreed] = React.useState("");
  React.useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((res) => setBreeds(Object.keys(res.message)))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value: string[]) => {
    setSelectedBreed('');
    setDeselectedBreed('');
  };

  const handleSelect = (value: string) => {
    setSelectedBreed(value);
  };

  const handleDeselect = (value: string) => {
    setDeselectedBreed(value);
  };

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "60%" }}
            placeholder="Seleccione raza(s)..."
            onChange={handleChange}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
          >
            {breeds.map((breed) => (
              <Option key={breed}>{breed}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <DogsSearchBySubBreed
            selectedBreeds={selectedBreeds}
            selectedBreed={selectedBreed}
            deselectedBreed={deselectedBreed}
          />
        </Col>
      </Row>

 
    </>
  );
};

export { DogsSearchByBreed };
