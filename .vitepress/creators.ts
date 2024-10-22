export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: 'GU_Nanfa',
    avatar: '',
        username: 'FUTIKang',
    title: 'GNF-Social 原始创作者',
    desc: '全栈开发工程师, JAVA后端开发 & React前端开发',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/FUTIKang' },
    //   { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/ayakaneko' },
    ],
    nameAliases: ['gunanfa', '孤南筏', '孤南筏', 'GU_Nanfa', 'GNF-Social'],
    emailAliases: ['2760373022@qq.com'],
  },
  
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
