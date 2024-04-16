import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { endpoint } from "../utils/endpoint";

const AddCameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);
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
      setModalVisible(true);
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

  const handleGoHome = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Custom Back Button component
  const BackButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={[styles.title, { color: "white" }]}>go Back</Text>

        {/* <Image
          source={require("../assets/iconBack.png")}
          style={styles.backImage}
        /> */}
      </TouchableOpacity>
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
          <BackButton />
          {/* <CustomHeader title={"Go back"}></CustomHeader> */}
          <View style={styles.verticalOverlay} />
          <View style={styles.overlayRow}>
            <View style={styles.horizontalOverlay} />
            <View style={styles.middleOverlay} />
            <View style={styles.horizontalOverlay} />
          </View>
          <View style={styles.verticalOverlay} />
        </View>
      </Camera>
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              The receipt has been sent to the system. Our platform will analyze
              it and add the items in your fridge as soon as it has completed
              the interpretation of the picture.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGoHome}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    // Adjust style as needed
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    gap: "5",
    alignItems: "center",
    top: 50, // Adjust top as necessary
    left: 10, // Adjust left as necessary
    zIndex: 10, // Ensure button is clickable over other elements
  },
  backImage: {
    // Adjust size as needed
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddCameraScreen;
