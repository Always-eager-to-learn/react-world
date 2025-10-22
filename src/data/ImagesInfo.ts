export interface ImageType {
    name: 'dogs' | 'cats' | 'birds' | 'horses'
}

const dogs = [
    {
        location: '/src/assets/Carousel/dog1.webp',
        altText: 'A dog smiling onto the camera',
        key: 'dog-1'
    },
    {
        location: '/src/assets/Carousel/dog2.webp',
        altText: 'A dog sitting on the beach',
        key: 'dog-2'
    },
    {
        location: '/src/assets/Carousel/dog3.webp',
        altText: 'A dog running on the beach during day time',
        key: 'dog-3'
    },
    {
        location: '/src/assets/Carousel/dog4.webp',
        altText: 'A white dog sitting on a rock formation near a large mountain pond.',
        key: 'dog-4'
    }
]

const cats = [
    {
        location: '/src/assets/Carousel/cat1.webp',
        altText: '',
        key: 'cat-1'
    },
    {
        location: '/src/assets/Carousel/cat2.webp',
        altText: 'A selective focus photo of a orange and white tabby cat.',
        key: 'cat-2'
    },
    {
        location: '/src/assets/Carousel/cat3.webp',
        altText: 'A selective focus photo of a gray tabby cat.',
        key: 'cat-3'
    },
    {
        location: '/src/assets/Carousel/cat4.webp',
        altText: 'A orange tabby cat sleeping on a white textile.',
        key: 'cat-4'
    },
    {
        location: '/src/assets/Carousel/cat5.webp',
        altText: 'A orange tabby kitten in grasses.',
        key: 'cat-5'
    },
]

const birds = [
    {
        location: '/src/assets/Carousel/bird1.webp',
        altText: 'Two small birds perched on a twig.',
        key: 'bird-1'
    },
    {
        location: '/src/assets/Carousel/bird2.webp',
        altText: 'A european robin perched on a tree branch.',
        key: 'bird-2'
    },
    {
        location: '/src/assets/Carousel/bird3.webp',
        altText: 'Two blue birds on a tree branch.',
        key: 'bird-3'
    },
    {
        location: '/src/assets/Carousel/bird4.webp',
        altText: 'Low angle photography of flock of silhouette of bird illustration.',
        key: 'bird-4'
    },
    {
        location: '/src/assets/Carousel/bird5.webp',
        altText: 'A yellow bird on a sakura tree.',
        key: 'bird-5'
    },
    {
        location: '/src/assets/Carousel/bird6.webp',
        altText: 'A small blue bird perched on a tree branch.',
        key: 'bird-6'
    },
]

const horses = [
    {
        location: '/src/assets/Carousel/horse1.webp',
        altText: 'Running white horse.',
        key: 'bird-5'
    },
    {
        location: '/src/assets/Carousel/horse2.webp',
        altText: 'Three assorted colored horses running away from a mountain.',
        key: 'bird-5'
    },
]

const images = ['dogs', 'cats', 'birds', 'horses']
const imagesDetails = {dogs, cats, birds, horses}

function getImagesDetails({ name }: ImageType){
    const returnImageInfo = imagesDetails[name]
    const itemIndex = images.indexOf(name)

    return {
        images: returnImageInfo,
        beforeValue: itemIndex === 0 ? null : images[itemIndex-1],
        afterValue: itemIndex === (images.length - 1) ? null : images[itemIndex+1]
    }
}

function checkType(name: string | null): name is ImageType['name'] {
    if(name === null)
        return false

    const index = images.indexOf(name)
    return index === -1 ? false : true
}

export { getImagesDetails, checkType }