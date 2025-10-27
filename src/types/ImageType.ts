export type ImageVariant = {
    desktop?: string,
    mobile?: string,
    altText: string,
    key: string
}

export type ImageResult = {
    images : ImageVariant[],
    beforeIndex: string | null,
    afterIndex: string | null
}