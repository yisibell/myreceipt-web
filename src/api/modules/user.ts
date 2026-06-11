import { request, unwrap, type ApiResponse } from "@/api/request";
import type {
  UpdateUserSettingsDto,
  UserSettingsResponse,
  UserSettings,
} from "@/api/interfaces/user";

export type { UpdateUserSettingsDto, UserSettingsResponse, UserSettings };

/** 获取用户 AI 设置 */
export async function fetchSettings() {
  return unwrap(
    await request<ApiResponse<UserSettings>>("/user/settings")
  );
}

/** 更新用户 AI 设置 */
export async function updateSettings(dto: UpdateUserSettingsDto) {
  return unwrap(
    await request<ApiResponse<UserSettingsResponse>>("/user/settings", {
      method: "PUT",
      body: dto,
    })
  );
}
