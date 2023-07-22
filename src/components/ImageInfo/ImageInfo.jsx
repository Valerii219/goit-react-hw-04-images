// import React, { Component } from "react";

// import { ImageGallery } from '../ImageGallery/ImageGallery';
// import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

// class ImageInfo extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: "idle",
//   };

  // 

  // render() {
  //   const { error, status, images } = this.state;
  //   if (status === "idle") {
  //     return <div>Please enter an image name</div>;
  //   }
  //   if (status === "pending") {
  //     return <div>Loading</div>;
  //   }
  //   if (status === "rejected") {
  //     return <h2>{error.message}</h2>;
  //   }
  //   if (status === "resolved") {
  //     return (
  //       <div>
  //         <h1>ImageInfo</h1>
  //         <ImageGallery images={images} />
  //         <ImageGalleryItem images={images} />
  //       </div>
  //     );
  //   }
  // }
// }

// export default ImageInfo;