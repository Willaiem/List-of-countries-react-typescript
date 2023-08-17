import { z } from "zod"

const baseCountryRawSchema = {
  flags: z.object({
    png: z.string(),
    alt: z.string()
  }),
  name: z.object({
    common: z.string(),
  }),
  population: z.coerce.string().transform(Number).transform((population) => new Intl.NumberFormat('en-US').format(population)),
}


export const countrySchema = z.tuple([z.object({
  tld: z.array(z.string()),
  currencies: z.object({
    SAR: z.object({
      name: z.string(),
      symbol: z.string()
    }).optional()
  }),
  capital: z.array(z.string()),
  region: z.string(),
  subregion: z.string(),
  languages: z.object({
    ara: z.string().default("We don't have a language, but we have big balls 😚")
  }).optional(),
  borders: z.array(z.string()),
}).extend(baseCountryRawSchema)])

export const countriesSchema = z.array(z.object({
  capital: z.array(z.string()),
  region: z.string(),
}).extend(baseCountryRawSchema).transform(country => ({
  ...country,
  countryParam: country.name.common.replaceAll(' ', '-').toLowerCase()
})))


export const borderSchema = z.array(z.object({
  borderName: z.string().transform((borderName) => borderName.replaceAll(' ', '-').toLowerCase()),
  countryCode: z.string()
}))

export type Countries = z.infer<typeof countriesSchema>
export type CountryDetails = Omit<z.infer<typeof countrySchema>[number], 'borders'> & { borders: z.infer<typeof borderSchema> }
