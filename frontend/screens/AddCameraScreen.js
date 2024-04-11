import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const AddCameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      savePictureToGallery(uri);
    }
  };

  const savePictureToGallery = async (uri) => {
    if (Platform.OS === "ios") {
      await CameraRoll.saveToCameraRoll(uri, "photo");
    } else {
      await MediaLibrary.saveToLibraryAsync(uri);
    }
  };

  const handleScan = () => {
    takePicture();
  };

  const handleCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleGoBack = () => {
    navigation.navigate("AddItem");
  };

  const CustomHeader = ({ title }) => {
    const styles = StyleSheet.create({
      header: {
        zIndex: -5,
        position: "absolute",
        top: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "transparent",
      },
      TouchableOpacity: {
        zIndex: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 16,
        color: "white",
      },
    });

    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPressIn={handleGoBack}
          style={styles.TouchableOpacity}
          // hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <View style={{ padding: 5 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        ratio="16:9"
        autoFocus="on"
        whiteBalance="auto"
        flashMode="auto"
      >
        <View style={styles.overlay}>
          <CustomHeader title={"Go back"}></CustomHeader>
          <View style={styles.verticalOverlay} />
          <View style={styles.overlayRow}>
            <View style={styles.horizontalOverlay} />
            <View style={styles.middleOverlay} />
            <View style={styles.horizontalOverlay} />
          </View>
          <View style={styles.verticalOverlay} />
        </View>
      </Camera>
      <TouchableOpacity style={styles.scanButton} onPress={handleGoBack}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  // overlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // middleOverlay: {
  //   backgroundColor: "rgba(0,0,0,0)",
  //   width: "80%",
  //   height: "50%",
  //   borderWidth: 1,
  //   borderColor: "orange",
  // },
  overlay: {
    flex: 1,
  },
  verticalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
  },
  overlayRow: {
    flex: 1,
    flexDirection: "row",
  },
  horizontalOverlay: {
    width: "10%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
  },
  middleOverlay: {
    width: "80%",
    borderWidth: 3,
    borderColor: "orange",
  },

  arrowBack: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  scanButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  scanButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default AddCameraScreen;
