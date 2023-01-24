const scripts = [
    'start_bouncing',
    'invite_to_draft'
] as const

type Script = typeof scripts[number]

export default Script