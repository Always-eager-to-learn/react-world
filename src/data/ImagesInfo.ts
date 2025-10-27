import { nanoid } from '@sitnik/nanoid'

export interface ImageType {
    categoryName: 'dogs' | 'cats' | 'birds' | 'horses'
}

const dogs = [
    'A dog with white skin and brown stripes bringing a ball.',
    'A dog sitting on the beach',
    'A dog running on the beach during day time',
    'A white dog sitting on a rock formation near a large mountain pond.',
]

const cats = [
    '',
    'A selective focus photo of a orange and white tabby cat.',
    'A selective focus photo of a gray tabby cat.',
    'A orange tabby cat sleeping on a white textile.',
    'A orange tabby kitten in grasses.',
]

const birds = [
    'Two small birds perched on a twig.',
    'A european robin perched on a tree branch.',
    'Two blue birds on a tree branch.',
    'Low angle photography of flock of silhouette of bird illustration.',
    'A yellow bird on a sakura tree.',
    'A small blue bird perched on a tree branch.',
]

const horses = [
    'Running white horse.',
    'Three assorted colored horses running away from a mountain.'
]

const images = ['dogs', 'cats', 'birds', 'horses'] // used to know how many image categories are present
const imagesDetails = {dogs, cats, birds, horses}
const imageModules = import.meta.glob('../assets/Carousel/*.webp', {
    eager: false
})
const imagesInfo : string[] = [] // only for the index in which the images where called
const groupedImagesDetails : {[categoryName : string] : {desktop?: string, mobile?:string, altText: string, key: string}[]} = {}

async function getImagesInfo({ categoryName } : ImageType){
    if(imagesInfo.includes(categoryName)){
        const itemIndex = images.indexOf(categoryName)
        return {
            images: groupedImagesDetails[categoryName],
            beforeIndex: itemIndex === 0 ? null : images[itemIndex - 1],
            afterIndex: itemIndex === (images.length - 1) ? null : images[itemIndex + 1]
        }
    }

    const groupedImages : {[categoryName : string] : {desktop?: string, mobile?:string, altText: string, key: string}[]} = {[categoryName]: []}
    const imagesOrder: number[] = []

    await Promise.all(
        Object.entries(imageModules).map(async ([path, loader]) => {
            const fileName = path.split('/').pop()
            const name = fileName?.split('.')[0]

            const match = name?.match(/^([a-zA-Z]+)(\d+)(?:-(mobile))?$/)
            if(!match) return

            const [, imageName, indexToUse, variant] = match
            if(!imagesInfo.includes(categoryName)){
                imagesInfo.push(categoryName)
            }

            if(`${imageName}s` !== categoryName) return

            const location = await loader() as {default: string}
            const numIndex = parseInt(indexToUse, 10)

            if(imagesOrder.includes(numIndex)) {
                const indexOfAdd = imagesOrder.indexOf(numIndex)
                if(variant === 'mobile'){
                    groupedImages[categoryName][indexOfAdd].mobile = location.default
                } else{
                    groupedImages[categoryName][indexOfAdd].desktop = location.default
                }
            } else {
                groupedImages[categoryName].push({
                    desktop: '',
                    mobile: '',
                    altText: imagesDetails[categoryName][numIndex - 1],
                    key: nanoid()
                })
                imagesOrder.push(numIndex)
                const currentIndex = imagesOrder.indexOf(numIndex)
                if(variant === 'mobile'){
                    groupedImages[categoryName][currentIndex].mobile = location.default
                } else {
                    groupedImages[categoryName][currentIndex].desktop = location.default
                }
            }
        })
    )

    console.log('Grouped Images', groupedImages)
    groupedImagesDetails[categoryName] = groupedImages[categoryName]
    const itemIndex = images.indexOf(categoryName)
    return {
        images: groupedImages[categoryName],
        beforeIndex: itemIndex === 0 ? null : images[itemIndex - 1],
        afterIndex: itemIndex === (images.length - 1) ? null : images[itemIndex + 1]
    }
}

function checkType(name: string | null): name is ImageType['categoryName'] {
    if(name === null)
        return false

    const index = images.indexOf(name)
    return index === -1 ? false : true
}

export { getImagesInfo, checkType }