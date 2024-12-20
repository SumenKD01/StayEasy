import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import SketchCanvas1 from './SketchCanvas1';
import SketchCanvas2 from './SketchCanvas2';

export default function NewCanvas() {

  return (
    <>
        <SketchCanvas1 />
        <SketchCanvas2 />
    </>
  );
}