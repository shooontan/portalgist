import {
  GistsGetAllResponseItem as Item,
  GistsGetAllResponseItemFilesHelloWorldRb,
} from '@octokit/rest';

interface AnyGistsGetAllResponseItem extends Item {
  files: any;
}

export interface GistsGetAllResponseItem extends AnyGistsGetAllResponseItem {
  files: {
    [key: string]: GistsGetAllResponseItemFilesHelloWorldRb;
  };
}

export type GistsGetAllResponse = GistsGetAllResponseItem[];
