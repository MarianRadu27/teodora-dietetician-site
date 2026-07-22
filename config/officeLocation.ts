export const officeLocation = {
  name: "DietON – Centrul de Dietetică și Nutriție",
  shortName: "DietON",
  address: "Strada Sfântul Lazăr 2",
  city: "Iași",
  mapUrl: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgKGIAEMgsIAhAuGAoYCxiABDILCAMQABgKGAsYgAQyEQgEEC4YChgLGMcBGNEDGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEHODE5ajBqNKgCALACAQ&um=1&ie=UTF-8&fb=1&gl=ro&sa=X&geocode=KdcgBf7S-8pAMQu_CNB0ERa4&daddr=Strada+Sf%C3%A2ntul+Laz%C4%83r+2,+700128+Ia%C8%99i",
  floor: "",
  room: "",
  accessInstructions: "",
  parkingInformation: "",
};

export function isOfficeLocationValueComplete(value: string): boolean {
  const trimmedValue = value.trim();
  return Boolean(trimmedValue) && !trimmedValue.startsWith("[");
}

export function getOfficeLocationAddress(): string {
  return `${officeLocation.address}, ${officeLocation.city}`;
}

export function hasOfficeLocationMapUrl(): boolean {
  return isOfficeLocationValueComplete(officeLocation.mapUrl);
}
