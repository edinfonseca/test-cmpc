import React from "react";
import { Select, Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { ImagesGallery } from "../ImagesGallery/ImagesGallery";
import "./DogsSearchByBreed.css";
type Dog = {
  breed: string;
  subBreed: string[];
  status: number;
};

type Props = {
  selectedBreeds: string[];
  selectedBreed: string;
  deselectedBreed: string;
};

const { Option, OptGroup } = Select;

const DogsSearchBySubBreed: React.FC<Props> = ({
  selectedBreeds,
  selectedBreed,
  deselectedBreed,
}) => {
  const [dogs, setDogs] = React.useState<Dog[]>([]);
  const [selectedDogs, setSelectedDogs] = React.useState<string[]>([]);

  const [dogsImages, setDogsImages] = React.useState<string[]>([]);

  const getImages = (event: any) => {
    let auxImages: string[] = [];
    Promise.all(
      selectedDogs.map(async (dog) => {
        try {
          const response = await fetch(
            "https://dog.ceo/api/breed/" + dog + "/images"
          );
          const res = await response.json();
          auxImages.push(...res.message);
          return res.message;
        } catch (err) {
          return console.log(err);
        }
      })
    ).then(() => {

      setDogsImages(auxImages);
    });
  };

  const handleSelect = (value: string) => {
    const arrSubBreed = value.split("/");
    const dogIndex = dogs.findIndex((dog) =>
      dog.subBreed.includes(arrSubBreed[1])
    );
    dogs[dogIndex].status++;
    const breedIndex = selectedDogs.findIndex(
      (dog) => dog === dogs[dogIndex].breed
    );
    const newSelectedDogs = [...selectedDogs];
    if (breedIndex >= 0) newSelectedDogs.splice(breedIndex, 1);
    newSelectedDogs.push(value);
    setSelectedDogs(newSelectedDogs);
  };

  const handleDeselect = (value: string) => {
    const deselectedIndex = selectedDogs.findIndex((dog) => dog === value);
    const newSelectedDogs = [...selectedDogs];
    newSelectedDogs.splice(deselectedIndex, 1);
    const arrSubBreed = value.split("/");
    const dogIndex = dogs.findIndex((dog) =>
      dog.subBreed.includes(arrSubBreed[1])
    );
    if (dogIndex >= 0) {
      dogs[dogIndex].status--;
      if (dogs[dogIndex].status <= 0) {
        newSelectedDogs.push(dogs[dogIndex].breed);
      }
    }
    setSelectedDogs(newSelectedDogs);
  };

  React.useEffect(() => {
    if (selectedBreed) {
      fetch("https://dog.ceo/api/breed/" + selectedBreed + "/list")
        .then((response) => response.json())
        .then((res) => {
          let auxDogs: Dog[] = [];
          auxDogs.push({
            breed: selectedBreed,
            subBreed: res.message,
            status: 0,
          });
          setSelectedDogs([...selectedDogs, selectedBreed]);
          setDogs([...dogs, ...auxDogs]);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedBreed]);

  React.useEffect(() => {
    setDogs(dogs.filter((dog: Dog) => dog.breed !== deselectedBreed));
    const deselectedIndex = selectedDogs.findIndex(
      (dog) => dog === deselectedBreed
    );
    const newSeletedDogs = [...selectedDogs];
    newSeletedDogs.splice(deselectedIndex, 1);
    setSelectedDogs(newSeletedDogs);
  }, [deselectedBreed]);

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "60%" }}
        placeholder="Seleccione sub-raza(s)..."
        onSelect={handleSelect}
        onDeselect={handleDeselect}
      >
        {dogs.map((dog) => (
          <OptGroup label={dog.breed} key={dog.breed}>
            {dog.subBreed.length > 0 &&
              dog.subBreed.map((subB) => (
                <Option value={dog.breed + "/" + subB} key={dog + "-" + subB}>
                  {subB}
                </Option>
              ))}
          </OptGroup>
        ))}
      </Select>
      <br />
      <Tooltip title="Buscar imágenes">
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          className="searchButton"
          onClick={getImages}
        />
      </Tooltip>

      <ImagesGallery dogsImages={dogsImages} />
    </>
  );
};

export { DogsSearchBySubBreed };
