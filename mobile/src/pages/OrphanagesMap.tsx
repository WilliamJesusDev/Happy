import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import mapMarkerImg from "../images/map-marker.png";

import api from "../services/api";

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

  useFocusEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.7036102,
          longitude: -46.6313653,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
              calloutAnchor={{ x: 3, y: 0.8 }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 168,
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 16,

    backgroundColor: "rgba(255,255,255,0.8)",

    justifyContent: "center",
  },
  calloutText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089a5",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingLeft: 24,
    height: 56,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 4,
  },
  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa8b3",
  },
  createOrphanageButton: {
    width: 56,
    height: 56,

    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
