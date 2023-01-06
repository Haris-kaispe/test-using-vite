import { config } from "../config";
import { get, post, postFormData, put } from "./axios";

export async function getData() {
  return await get(config.apiUrl + "posts/");
}

export async function uploadFiles(rec) {
  return await postFormData(
    config.customerPortal + "/contact/upload",
    // config.nodeServer + "/upload",
    rec
    //  {
    //   onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
    // }
  );
}
