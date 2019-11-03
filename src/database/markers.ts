import { firestore } from "firebase/app";
import "firebase/firestore";

import { GeoFirestore } from "geofirestore";
import { GeoPoint as IGeoPoint, DocumentData } from "@firebase/firestore-types";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  id: string;
  attended: boolean;
  coordinates: IGeoPoint;
  user: string;
}

export const GeoPoint = firestore.GeoPoint;

const transformCoordinateToGeoPoint = ({ latitude, longitude }: Coordinates) =>
  new firestore.GeoPoint(latitude, longitude);

export default class Markers {
  private static getGeofireMarkersReference() {
    const geoRef = new GeoFirestore(firestore());
    return geoRef.collection("markers");
  }

  static async add(userUid: string, coordinates: Coordinates) {
    const markersCollection = Markers.getGeofireMarkersReference();
    await markersCollection.add({
      user: userUid,
      attended: false,
      coordinates: transformCoordinateToGeoPoint(coordinates)
    });
  }

  static getWithinRadius(radius: number, center: Coordinates) {
    const markersCollection = Markers.getGeofireMarkersReference();
    return markersCollection
      .near({
        center: transformCoordinateToGeoPoint(center),
        radius
      })
      .get();
  }

  static delete(id: string) {
    Markers.getGeofireMarkersReference()
      .doc(id)
      .delete();
  }

  static async markAsAttended(id: string) {
    const markerReference = Markers.getGeofireMarkersReference().doc(id);
    const marker = (await markerReference.get()).data();
    markerReference.update({ ...marker, attended: true });
  }
}
