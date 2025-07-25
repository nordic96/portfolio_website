export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_url: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    side_admin: boolean;
}

export interface Asset {
    url: string;
    browser_download_url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    state: string;
    content_type: string;
    size: number;
    digest: string;
    download_count: number;
    created_at: string;
    uploaded_at: string;
    uploader: User;
}

export interface Release {
    url: string;
    html_url: string;
    assets_url: string;
    upload_url: string;
    tarball_url: string;
    zipball_url: string;
    id: number;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    body: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    author: User;
    assets: Asset[];
}
