import React, { FC } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

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
    <Button mode='outlined' onPress={pickImage}>
      Selecciona una foto
    </Button>
  );
};

export default ImagePicker;
