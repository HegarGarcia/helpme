import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface ActionBarProps {
  title?: string;
  onBackPress?: () => void;
}

const ActionBar: FC<ActionBarProps> = ({ title, onBackPress, children }) => (
  <Appbar.Header>
    {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
    <Appbar.Content title={title} />
    {children}
  </Appbar.Header>
);

export default ActionBar;
