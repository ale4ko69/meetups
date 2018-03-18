<template>
  <img :src=imageSrc />
</template>

<script>
/**
 *  <blurry-image-loader
    src="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg"
    small-src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20"
    ></blurry-image-loader>
 */
export default {
  name: 'blurry-image-loader',
  props:['src', 'smallSrc'],
  data: function () {
    return {
      imageSrc: this.smallSrc
    }
  },
  created(){
    var img, that;
    img = new Image();
    that = this;

    img.onload = function(){
        that.imageSrc = that.src;
    }

    img.src = this.src;      
  }
}
</script>

