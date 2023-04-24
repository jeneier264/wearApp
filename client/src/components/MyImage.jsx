import React, { useEffect, useRef} from 'react';
import { Transformer, Image } from 'react-konva';
import useImage from 'use-image';


const MyImage = ({ imageSrc, shapeProps, offsetX, isSelected, onSelect, onChange}) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [image] = useImage(imageSrc, 'Anonymous');
    
    useEffect(() => {
      if(isSelected) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      } 
    }, [isSelected]);
  
    return (
      <React.Fragment>
        <Image
          image={image} 
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          offsetX={offsetX}
          cr
          {...shapeProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX() ;
            const scaleY = node.scaleY();
  
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
  
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
  
        {isSelected && (
          <Transformer
            ref={trRef}
            anchorStroke={'gray'}
            anchorSize={8}
            borderStroke={'gray'}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </React.Fragment>
    );
};

export default MyImage;