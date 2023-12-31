export interface iRicetta {
  id: number
  nome: string
  categoria: string
  ingrediente_1: string | undefined
  persone: number
  note: string
  ingredienti: string[]
  preparazione: string
  immagine_primaria: string
  visibile: string
  public: boolean
  userId: number
}
