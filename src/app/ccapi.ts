export interface CcaApiResultCode {
  rc: Number
  , msg: string
}

export interface CcapiResult {
  res: CcaApiResultCode
  , data: any
}
