export default function (
  event,
  maximumSize,
  setImgData,
  setPicture,
  setImgFile,
  ratio
) {
  const image = event.target;
  const file = image.files[0];

  if (!file) {
    setImgData({ value: null, error: null });
    return;
  }

  setImgFile(file);

  const calculateAspectRatio = img => {
    return new Promise(resolve => {
      img.onload = () => {
        const gcd = (a, b) => {
          if (b === 0) {
            return a;
          }
          return gcd(b, a % b);
        };
        const aspectRatio = `${img.width / gcd(img.width, img.height)
          }:${img.height / gcd(img.width, img.height)}`;
        resolve(aspectRatio);
      };
    });
  };

  const reader = new FileReader();
  reader.onload = e => {
    const imgSrc = e.target.result;
    const img = new Image();
    img.src = imgSrc;

    calculateAspectRatio(img).then(aspectRatio => {
      const status = aspectRatio === ratio;
      console.log(file.size / 1024)
      setPicture({
        sizeError:
          file.size / 1024 <= maximumSize
            ? false
            : "size is too high of the image choose under " + maximumSize + "kb",
        ratioError: status
          ? false
          : `please select an image of ${ratio} aspect ratio.`,
      });

      setImgData({ value: imgSrc, error: null });
    });
  };

  reader.readAsDataURL(file);
}
