import { z } from "zod";

const playerSchema = z.object({
    username: z.string(),
    xp: z.number()
})

type Player = z.infer<typeof playerSchema>

const newPlayer: Player = {
    username: "arif",
    xp: 47
}

export const outputPlayer = () => {
    return {
        parse: playerSchema.parse(newPlayer),
        safeParse: playerSchema.safeParse(newPlayer)
    }
}