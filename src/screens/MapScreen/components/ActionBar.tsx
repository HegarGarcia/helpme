import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import MenuDialog from "./MenuDialog";

export default function ActionBar() {
  const [isVisible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!isVisible);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon={"menu"} onPress={toggleMenu} />
        <Appbar.Content title="Ayudame" subtitle="" />
      </Appbar.Header>
      <MenuDialog isVisible={isVisible} toggle={toggleMenu} />
    </>
  );
}
