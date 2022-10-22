import React from "react";
import { Image, Col, Row, Pagination } from "antd";
import "antd/dist/antd.css";
import "./ImagesGallery.css";

type Props = {
  dogsImages: string[];
};

const ImagesGallery: React.FC<Props> = ({ dogsImages }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(12);

  const handleChange = (value: number) => {
   setCurrentPage(value);
   setMinValue((value-1) * 12);
   setMaxValue(value * 12)
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Image.PreviewGroup>
          {dogsImages?.map((dog, index)=> index >= minValue && index < maxValue &&(
              <Col xs={12} sm={12} md={6} lg={6} key={dog+'1'}>
                <Image width={150} height={150} src={dog} key={dog} />
              </Col>
            ))}
         
        </Image.PreviewGroup>
      </Row>

      {dogsImages.length > 0 && (
            <Pagination
              pageSize={12}
              current={currentPage}
              total={dogsImages.length}
              onChange={handleChange}
              className="pagination-gallery"
              showSizeChanger={false}
              showQuickJumper={false}
            />
          )}
    </>
  );
};

export { ImagesGallery };
