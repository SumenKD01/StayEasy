import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

export default function SketchCanvas2() {
  const canvasRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvas
        ref={canvasRef}
        strokeColor={'black'}
        strokeWidth={8}
        containerStyle={styles.container}
      />
      <Button onPress={canvasRef.current?.reset} title="Reset" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
});