import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../cache';
import { request } from '../request';

export interface WebsiteInfo {
  id: string;
  name: string;
  domain: string | null;
  shareId: string | null;
  resetAt: string | null;
  workspaceId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export async function getWorkspaceWebsites(
  workspaceId: string
): Promise<WebsiteInfo[]> {
  const { data } = await request.get('/api/workspace/websites', {
    params: {
      workspaceId,
    },
  });

  return data.websites;
}

export async function getWorkspaceWebsiteInfo(
  workspaceId: string,
  websiteId: string
): Promise<WebsiteInfo | null> {
  const { data } = await request.get(`/api/workspace/website/${websiteId}`, {
    params: {
      workspaceId,
    },
  });

  return data.website;
}

export async function updateWorkspaceWebsiteInfo(
  workspaceId: string,
  websiteId: string,
  info: { name: string; domain: string }
) {
  await request.post(`/api/workspace/website/${websiteId}`, {
    workspaceId,
    name: info.name,
    domain: info.domain,
  });

  queryClient.resetQueries(['websites', workspaceId]);
}

export function useWorspaceWebsites(workspaceId: string) {
  const { data: websites = [], isLoading } = useQuery(
    ['websites', workspaceId],
    () => {
      return getWorkspaceWebsites(workspaceId);
    }
  );

  return { websites, isLoading };
}

export function useWorkspaceWebsiteInfo(
  workspaceId: string,
  websiteId: string
) {
  const { data: website = null, isLoading } = useQuery(
    ['website', workspaceId, websiteId],
    () => {
      return getWorkspaceWebsiteInfo(workspaceId, websiteId);
    },
    { cacheTime: 0 }
  );

  return { website, isLoading };
}

export function refreshWorkspaceWebsites(workspaceId: string) {
  queryClient.refetchQueries(['websites', workspaceId]);
}

export async function addWorkspaceWebsite(
  workspaceId: string,
  name: string,
  domain: string
) {
  await request.post('/api/workspace/website', {
    workspaceId,
    name,
    domain,
  });
}