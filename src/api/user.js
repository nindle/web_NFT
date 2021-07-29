import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

// 用户信息
export async function userInfoApi(address) {
  const resp = await request.get(
    "/v1/user?address=" + address
  );
  sessionStorage.setItem("userInfo", resp.data.user_name);
  return resp;
}
