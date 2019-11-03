import { firestore } from "firebase/app";
import "firebase/firestore";

import { GeoFirestore } from "geofirestore";
import { GeoPoint as IGeoPoint } from "@firebase/firestore-types";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  id?: string;
  needy: string;
  necessity: string;
  details: string;
  references: string;
  attended: boolean;
  userUid: string;
  coordinates: IGeoPoint;
}

export const GeoPoint = firestore.GeoPoint;

export const transformCoordinateToGeoPoint = ({
  latitude,
  longitude
}: Coordinates) => new firestore.GeoPoint(latitude, longitude);

export default class Markers {
  private static getGeofireMarkersReference() {
    const geoRef = new GeoFirestore(firestore());
    return geoRef.collection("markers");
  }

  static async add(marker: IMarker) {
    const markersCollection = Markers.getGeofireMarkersReference();
    await markersCollection.add(marker);
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
