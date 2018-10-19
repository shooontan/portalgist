import {
  GistsGetAllResponseItem as OriginalGistsGetAllResponseItem,
  GistsGetAllResponseItemFilesHelloWorldRb,
  GistsGetResponse,
  GistsGetResponseFilesHelloWorldRb,
  GistsGetResponseForksItem,
  GistsGetResponseHistoryItem,
  GistsGetResponseOwner as OriginalGistsGetResponseOwner,
  GistsEditResponse,
} from '@octokit/rest';
import { Overwrite } from 'typelevel-ts';

// owner
export type GistGetResponseOwner = OriginalGistsGetResponseOwner;

/**
 * [get] /gists
 */

// file
export type GistsGetAllResponseFilesFile = GistsGetAllResponseItemFilesHelloWorldRb;

// files
export interface GistsGetAllResponseFiles {
  [key: string]: GistsGetAllResponseFilesFile;
}

// item
export type GistsGetAllResponseItem = Overwrite<
  OriginalGistsGetAllResponseItem,
  {
    files: GistsGetAllResponseFiles;
  }
>;

// response
export type GistsGetAllResponse = GistsGetAllResponseItem[];

/**
 * [get] /gist/:gist_id
 */

// file
export type GistGetResponseFilesFile = GistsGetResponseFilesHelloWorldRb;

// files
export interface GistGetResponseFiles {
  [key: string]: GistGetResponseFilesFile;
}

// forks
export type GistGetResponseForks = GistsGetResponseForksItem[];

// history
export type GistGetResponseHistory = GistsGetResponseHistoryItem[];

// response
export type GistGetResponse = Overwrite<
  GistsGetResponse,
  {
    files: GistGetResponseFiles;
  }
>;

/**
 * [patch] /gists/:gist_is
 */

// response
export type GistPatchEditResponse = Overwrite<
  GistsEditResponse,
  {
    files: GistGetResponseFiles;
  }
>;
