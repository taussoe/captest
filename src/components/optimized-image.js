export const OptimizedImage = (imgurl, size) => {
    return imgurl.replace(`img/`, `img/cms/${size}/`)
}