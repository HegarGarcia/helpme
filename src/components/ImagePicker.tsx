import React, { FC } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import Button from "./Button";

interface ImagePickerProps {
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
}

const ImagePicker: FC<ImagePickerProps> = ({ setImageUri }) => {
  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images
    });

    if (result.cancelled === false) {
      setImageUri(result.uri);
    }
  };

  return (
    <Button
      title='Selecciona una foto'
      style={{ borderRadius: 50 }}
      onPress={pickImage}
    />
  );
};

export default ImagePicker;
