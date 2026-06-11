export interface UpdateUserSettingsDto {
  geminiApiKey?: string;
  geminiModel?: string;
}

/** PUT /user/settings 响应 */
export interface UserSettingsResponse {
  userId: number;
  geminiModel: string;
}

/** GET /user/settings 响应 */
export interface UserSettings {
  geminiModel: string;
  geminiApiKey?: string;
}
