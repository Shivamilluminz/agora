import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export const channelName = "1-create-group-2024-07-25t042606232z";
const screenShareUid = "1-create-group-2024-07-25t042606232z_SS";
const callRecordingUid = "0";
const callRecordingToken = "007eJxTYCg/c++z/tFvq148Dgw/xr5ofYa6pu/97zL638RuR2ZPNbqkwGCZbJaSamlinpSUZG5iYGRimZyUamqQamyWmmxobJiUlvdwYVrd+4VpXY82MzMyMDKwMDAygPhMYJIZTLKASRUGQ93kotTEklTd9KL80gJdIwMjE10Dc10j0xIDEyMzAzMjY6MqRgYDAAkrNiY=";
const screenShareToken = "007eJxTYBDe5S39y2NO83nm2N+LXj0NuHTv0aT3vkYhHZ0Nd3+mnlykwGCZbJaSamlinpSUZG5iYGRimZyUamqQamyWmmxobJiUlvdwYVrd+4Vp+5yVGBkZGBlYGBgZQHwmMMkMJlnApAqDoW5yUWpiSapuelF+aYGukYGRia6Bua6RaYmBiZGZgZmRsVGVOlGq4oODAQmaQRw=";
const token = "007eJxTYDBVPFT+stii9v9UeZ2s1vAC3Zo98vMnRAecnH9m/ZK2CWoKDJbJZimplibmSUlJ5iYGRiaWyUmppgapxmapyYbGhklpeQ8XptW9X5iWXRTJxMjAyMDCwMgA4jOBSWYwyQImVRgMdZOLUhNLUnXTi/JLC3SNDIxMdA3MdY1MSwxMjMwMzIyMjaqYGMzMAKUNMyw=";
const rtmUid = "RTM_66";
const rtmToken = "007eJxTYPj9pS4vPz3qk8b66EWfa+IMp04O5n9TZek5t+ex2GlV1xkKDJbJZimplibmSUlJ5iYGRiaWyUmppgapxmapyYbGhklpeQ8XptW9X5j23VOGlZGBiYGRgZEBxGdjCArxjTczAwDk5CP6";
const displayName = "Vineet";


const appId = "9c6de947bbb740249cbe50e36ec131bf";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token,displayName:"shivam",screenShareToken:screenShareToken,screenShareUid:screenShareUid,callRecordingUid:callRecordingUid ,callRecordingToken:callRecordingToken,rtmUid:rtmUid,rtmToken:rtmToken};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

