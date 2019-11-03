import React, { FC } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import Button from "./Button";
import { storage } from "firebase";

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

  return <Button title='Selecciona una foto' onPress={pickImage} />;
};

export const uploadImageToCloudStorage = async (
  userUid: string,
  uri: string
) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const uploadTask = await storage()
    .ref()
    .child(`profiles/${userUid}`)
    .put(blob);
  return uploadTask.downloadURL;
};

export default ImagePicker;
