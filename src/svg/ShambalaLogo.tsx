import * as React from 'react'
import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  titlecolor?: string;
}

const ShambalaLogo=(props: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={280}
    height={80}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)' >
      <mask
        id='b'
        width={95}
        height={55}
        x={0}
        y={15}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'luminance'
        }}
      >
        <path
          fill='#fff'
          d='M94.249 40.184c-.505.367-1.034.867-1.943 1.016-1.172-.299-1.907.126-2.829.684-3.923-.942-6.066-5.316-9.486-7.235-1.63-.986-3.516-1.614-5.053-2.704l-.1-.143c-.941-1.206-1.79-2.942-3.483-3.084-.704.078-1.334.158-1.907.234-6.454-1.02-12.69-12.013-17.791-13.531-2.036-1.392-4.685 2.429-6.696 2.1-1.2-1.3-2.544-1.371-5.472 1.554-4.068 3.468-9.849 4.286-12.88 9.043-1.254 1.758-2.772 3.565-4.862 4.185-1.322-1.254-2.646-1.973-5.167-.977-2.9 1.146-5.283 3.498-7.505 5.604-2.715 2.905-5.802 5.455-8.794 7.379-.043.82-.114 1.543-.114 2.374 0 7.307 1.985 14.162 4.99 20.324l.03-.02 1.028-.888 1.032-.86 1.04-.598 1.047-.28 1.051-.086h1.052l1.053.094 1.053.218 1.053.246 1.051.064 1.05-.25 1.052-.459 1.053-.377.904-.053.15-.009 1.05.25 1.05.325 1.052.054 1.058-.491 1.067-1.099 1.078-1.474 1.081-1.373 1.076-.78 1.06.048 1.045.755 1.033 1.11.546.582.482.513 1.03.882 1.034.691 1.032.635 1.027.706 1.02.848 1.012.956.007.007 1.003.911.362.256c3.054-2.324 2.473-9.334 2.055-12.382-.764-.716-1.44-1.533-2.03-2.344-.921-1.268-1.665-2.656-2.285-4.086h-.002c-1.135.154-2.207-2.328-2.731-3.351-.524-1.023-.787-3.837 0-4.383a.725.725 0 0 1 .623-.114 24.122 24.122 0 0 1-.143-2.273c.832.107 1.744.12 2.741.009 3.33-.373 6.692-1.902 8.392-4.772.59-.996.967-2.103 1.517-3.121.55-1.019 1.325-1.986 2.409-2.406.25-.097 2.451-.961 2.964-1.418.404-.358.7-.738.83-1.148.238-.755-.546-1.04-.758-1.654-.077-.222-.004-.556.141-.741.339-.428.966-.826 1.605-1.146-.515.355-.98.759-1.215 1.16a.77.77 0 0 0-.011.732c.29.563 1.25 1.179 1.092 1.938-.1.482-.449 1.003-.889 1.532-.617.743-1.415 1.503-1.956 2.195a1.77 1.77 0 0 0-.174 1.925c.574 1.066 1.424 1.966 2.54 2.421.576.234 1.193.348 1.777.56.584.21 1.158.545 1.465 1.083.305.536.511 1.327.015 1.693 0 .002 0 .003.002.003.252-.014.493-.056.724-.12.017.302.025.606.025.915 0 .865-.05 1.752-.144 2.645a.73.73 0 0 1 .667.102c.786.546.524 3.36 0 4.382-.52 1.013-1.576 3.456-2.7 3.354-.692 1.62-1.544 3.146-2.548 4.5-.297.4-.616.79-.957 1.16-.394 2.466-1.457 10.971 2.173 13.313.784.505 1.669.933 2.589 1.294l.527-.088 1.061-.248.07-.018.236-.215 1.013-.957 1.02-.848 1.027-.706 1.032-.634 1.033-.692 1.03-.882 1.029-1.096 1.032-1.109 1.045-.755 1.06-.048 1.076.78 1.081 1.372 1.078 1.475 1.068 1.099 1.058.49 1.051-.053 1.05-.324 1.051-.251 1.054.061 1.053.377 1.051.459 1.05.25 1.051-.064.895-.209.158-.037 1.054-.218 1.053-.094h1.051l1.051.087.958.256c2.905-6.079 4.522-12.874 4.522-20.052 0-2.118-.067-4.4-.34-6.442h-.004Z'
        />
      </mask >
      <g mask='url(#b)' >
        <path
          fill='#1BCA52'
          d='M47.925 91.797c25.344 0 45.89-20.48 45.89-45.744S73.268.309 47.924.309s-45.89 20.48-45.89 45.744c0 25.263 20.546 45.744 45.89 45.744Z'
        />
      </g >
      <path
        stroke='#0F72EC'
        strokeMiterlimit={10}
        strokeWidth={0.262}
        d='M6.608 65.845c-3.951-8.125-5.563-17.59-3.96-27.527 2.847-17.642 19.744-34.58 37.43-37.5 28.81-4.757 53.736 17.268 53.736 45.095 0 7.37-1.748 14.331-4.853 20.497'
      />
      <path
        fill='#1BCA52'
        d='M45.138 43.027s-1.402.418-2.787.18c-1.628-.278-3.554-1.448-4.12-1.47.405.196 1.458 1.148 2.872 1.611 1.255.41 2.822.4 4.035-.32ZM49.622 43.027s1.403.418 2.788.18c1.628-.278 3.554-1.448 4.12-1.47-.405.196-1.458 1.148-2.873 1.611-1.254.41-2.822.4-4.035-.32Z'
      />
      <path
        fill={props.titlecolor}
        d='M163.587 69.728c.213 0 .434-.038.638-.114l-.047-.753a1.087 1.087 0 0 1-.434.095c-.508 0-.757-.306-.757-.85v-5.512h-.887v5.589c0 .973.536 1.545 1.488 1.545h-.001Zm-5.33-4.371c.823 0 1.425.515 1.588 1.24l-3.243.61v-.095c0-1.059.688-1.755 1.655-1.755Zm.189 3.586c-.851 0-1.483-.4-1.741-1.097l4.028-.782c-.029-1.507-1.11-2.48-2.497-2.48-1.473 0-2.545 1.078-2.545 2.576 0 1.497 1.091 2.585 2.727 2.585.842 0 1.54-.287 1.99-.82l-.497-.592c-.373.41-.871.61-1.464.61h-.001ZM222.683 68.943c-.976 0-1.713-.706-1.713-1.784s.737-1.774 1.713-1.774c.975 0 1.703.697 1.703 1.774 0 1.078-.728 1.784-1.703 1.784Zm0 .801c1.521 0 2.631-1.078 2.631-2.585s-1.11-2.575-2.631-2.575c-1.521 0-2.641 1.068-2.641 2.575 0 1.507 1.12 2.585 2.641 2.585Zm-3.431-1.273a1.124 1.124 0 0 1-.693.23c-.499 0-.767-.293-.767-.815v-2.463h1.419v-.884h-1.419v-1.06h-.887v4.444c0 .978.564 1.518 1.552 1.518.398 0 .804-.11 1.072-.339l-.277-.63Zm-6.209-3.907c-.798 0-1.443.296-1.813.81v-.835h-.887v5.127h.887v-2.603c0-1.097.64-1.678 1.629-1.678.882 0 1.386.486 1.386 1.478v2.804h.887v-2.909c0-1.488-.864-2.194-2.089-2.194Zm-6.366.792c.823 0 1.425.515 1.588 1.24l-3.244.61v-.095c0-1.058.689-1.755 1.656-1.755Zm.142 3.586c-.852 0-1.483-.4-1.742-1.097l4.028-.781c-.028-1.508-1.11-2.48-2.497-2.48-1.473 0-2.545 1.078-2.545 2.575 0 1.498 1.091 2.585 2.727 2.585.842 0 1.541-.286 1.99-.82l-.497-.592c-.373.41-.871.61-1.464.61Zm-4.99.724h.886v-5.128h-.886v5.128Zm.493-6.008a.6.6 0 0 0 .621-.61c0-.324-.268-.582-.621-.582a.604.604 0 0 0-.622.601c0 .334.268.592.622.592Zm-4.19.905c-.871 0-1.587.362-1.974.935-.339-.63-.997-.935-1.781-.935-.784 0-1.404.286-1.771.801v-.826h-.887v5.128h.887v-2.604c0-1.097.604-1.678 1.524-1.678.834 0 1.313.486 1.313 1.478v2.804h.887v-2.603c0-1.097.604-1.678 1.524-1.678.835 0 1.314.486 1.314 1.478v2.804h1.064v-2.909c0-1.488-.852-2.194-2.1-2.194Zm-9.074 5.103h.887v-5.128h-.887v5.128Zm.481-6.008a.6.6 0 0 0 .622-.61c0-.324-.268-.582-.622-.582a.604.604 0 0 0-.622.601c0 .334.268.592.622.592Zm-2.194.88-1.805 4.112-1.766-4.112h-.971l2.252 5.128h.951l2.252-5.128h-.913Zm-7.374 4.404c-.976 0-1.712-.706-1.712-1.783 0-1.078.737-1.774 1.712-1.774.976 0 1.703.696 1.703 1.774 0 1.077-.727 1.783-1.703 1.783Zm0 .802c1.521 0 2.631-1.078 2.631-2.585s-1.11-2.576-2.631-2.576c-1.521 0-2.641 1.069-2.641 2.576 0 1.507 1.12 2.584 2.641 2.584Zm-5.961-5.18c-.871 0-1.588.362-1.975.934-.338-.629-.997-.934-1.781-.934-.783 0-1.403.286-1.771.8v-.825h-.887v5.127h1.065v-2.603c0-1.097.604-1.678 1.524-1.678.834 0 1.313.486 1.313 1.478v2.804h.887v-2.603c0-1.097.604-1.679 1.524-1.679.835 0 1.314.486 1.314 1.478v2.804h.887V66.76c0-1.488-.852-2.194-2.1-2.194v-.001ZM279.052 69.728c.213 0 .434-.038.638-.114l-.046-.753a1.094 1.094 0 0 1-.435.095c-.508 0-.757-.306-.757-.85v-5.512h-.887v5.589c0 .973.536 1.545 1.488 1.545h-.001Zm-5.91-.785c-.976 0-1.712-.706-1.712-1.784s.736-1.774 1.712-1.774 1.703.697 1.703 1.774c0 1.078-.737 1.784-1.703 1.784Zm1.585-4.404v.856s-.944-.811-1.662-.811c-1.483 0-2.564 1.03-2.564 2.575 0 1.546 1.081 2.585 2.564 2.585.746 0 1.398-.286 1.84-.859v.781h.886V64.54h-1.064Zm-5.103 3.932a1.124 1.124 0 0 1-.693.23c-.499 0-.767-.293-.767-.815v-2.463h1.419v-.884h-1.419v-1.06h-.887v4.444c0 .978.564 1.518 1.552 1.518.398 0 .804-.11 1.072-.339l-.277-.63Zm-6.032-3.907c-.797 0-1.442.296-1.813.81v-.835h-.886v5.127h.886v-2.603c0-1.097.64-1.678 1.629-1.678.882 0 1.387.486 1.387 1.478v2.804h.886v-2.909c0-1.488-.864-2.194-2.089-2.194Zm-6.543.792c.823 0 1.425.515 1.588 1.24l-3.244.61v-.095c0-1.058.689-1.755 1.656-1.755Zm.229 3.586c-.851 0-1.483-.4-1.741-1.097l4.028-.781c-.029-1.508-1.11-2.48-2.497-2.48-1.473 0-2.545 1.078-2.545 2.575 0 1.498 1.091 2.585 2.727 2.585.842 0 1.541-.286 1.99-.82l-.497-.592c-.373.41-.871.61-1.464.61h-.001Zm-4.9.724h.887v-5.128h-.887v5.128Zm.404-6.008a.6.6 0 0 0 .621-.61c0-.324-.267-.582-.621-.582a.604.604 0 0 0-.622.601c0 .334.268.592.622.592Zm-4.372 5.284c-.967 0-1.703-.706-1.703-1.784s.737-1.774 1.703-1.774c.965 0 1.712.696 1.712 1.774s-.736 1.784-1.712 1.784Zm.076-4.359c-.718 0-1.783.811-1.783.811v-2.8h-.887v7.072h.709v-.781c.564.572 1.215.858 1.961.858 1.483 0 2.564-1.039 2.564-2.584 0-1.546-1.081-2.576-2.564-2.576Zm-6.367-.02c-.871 0-1.587.362-1.974.935-.339-.63-.997-.935-1.781-.935-.784 0-1.403.286-1.771.801v-.826h-.887v5.128h.887v-2.604c0-1.097.604-1.678 1.524-1.678.834 0 1.314.486 1.314 1.478v2.804h.886v-2.603c0-1.097.605-1.678 1.525-1.678.834 0 1.313.486 1.313 1.478v2.804h1.064v-2.909c0-1.488-.851-2.194-2.1-2.194Zm-10.788 4.379c-.976 0-1.712-.706-1.712-1.784s.737-1.774 1.712-1.774c.976 0 1.703.696 1.703 1.774s-.737 1.784-1.703 1.784Zm1.537-4.404v.856s-.896-.811-1.614-.811c-1.483 0-2.564 1.03-2.564 2.575 0 1.546 1.081 2.585 2.564 2.585.746 0 1.397-.286 1.791-.859v.781h.887v-5.127h-1.064ZM149.681 68.943c-.976 0-1.712-.706-1.712-1.784s.736-1.774 1.712-1.774c.977 0 1.703.697 1.703 1.774 0 1.078-.727 1.784-1.703 1.784Zm0 .801c1.522 0 2.631-1.078 2.631-2.585s-1.11-2.575-2.631-2.575c-1.52 0-2.64 1.068-2.64 2.575 0 1.507 1.12 2.585 2.64 2.585Zm-6.525-.801c-.976 0-1.712-.706-1.712-1.784s.736-1.774 1.712-1.774c.977 0 1.703.697 1.703 1.774 0 1.078-.736 1.784-1.703 1.784Zm1.562-6.349v2.8s-.921-.81-1.638-.81c-1.483 0-2.565 1.03-2.565 2.575 0 1.546 1.082 2.585 2.565 2.585.746 0 1.397-.286 1.815-.859v.781h.887v-7.072h-1.064Zm-7.587 1.97c-.798 0-1.443.296-1.814.81v-.835h-.886v5.127h.886v-2.603c0-1.097.64-1.678 1.629-1.678.883 0 1.387.486 1.387 1.478v2.804h.886v-2.909c0-1.488-.864-2.194-2.088-2.194Zm-7.044 4.378c-.976 0-1.712-.705-1.712-1.783 0-1.078.736-1.774 1.712-1.774s1.703.696 1.703 1.774-.736 1.783-1.703 1.783Zm1.683-4.404v.856s-1.042-.81-1.76-.81c-1.483 0-2.564 1.03-2.564 2.575 0 1.545 1.081 2.584 2.564 2.584.746 0 1.398-.286 1.937-.858v.78h.71v-5.127h-.887Zm-5.446 0-1.805 4.112-1.767-4.112h-.97l2.252 5.128h.951l2.252-5.128h-.913Zm-6.261 5.128h.887v-5.128h-.887v5.128Zm.437-6.008a.6.6 0 0 0 .622-.61c0-.324-.268-.582-.622-.582a.603.603 0 0 0-.621.601c0 .334.267.592.621.592Zm-1.856 5.074a1.16 1.16 0 0 1-.718.239c-.516 0-.7-.85-.7-.85v-2.7h1.419v-.883h-1.419v-1.061h-1.065v4.682c.053 1.02.636 1.583 1.66 1.583.412 0 .833-.114 1.11-.352l-.287-.658Zm-4.01.995c.212 0 .434-.038.637-.114l-.046-.753a1.09 1.09 0 0 1-.434.095c-.508 0-.758-.306-.758-.85v-5.512h-.886v5.589c0 .973.535 1.545 1.487 1.545Zm-4.148-5.189v2.613c0 1.088-.629 1.679-1.611 1.679-.893 0-1.404-.496-1.404-1.488v-2.804h-.887v2.95c0 1.51.87 2.235 2.18 2.235.717 0 1.349-.3 1.722-.832v.774h.887v-5.127h-.887Zm-7.399 5.224c1.043 0 1.942-.362 2.555-1.049l-.622-.6c-.517.543-1.148.8-1.885.8-1.512 0-2.631-1.087-2.631-2.565s1.12-2.566 2.631-2.566c.737 0 1.368.248 1.885.792l.622-.6c-.612-.687-1.512-1.04-2.545-1.04-2.038 0-3.55 1.44-3.55 3.414 0 1.974 1.512 3.414 3.541 3.414h-.001ZM265.468 49.389v-3.498c0-4.186 2.254-6.222 5.836-6.222 3.582 0 5.835 2.035 5.835 6.222v3.498h-11.671Zm5.717-12.246c-5.154 0-8.59 3.097-8.59 9.031v11.269h2.873v-5.549h11.671v5.549h2.693V46.174c0-5.935-3.436-9.031-8.647-9.031Zm-25.467 20.3h13.826v-2.506h-10.953v-17.54h-2.873v20.046ZM225.25 49.39v-3.498c0-4.186 2.253-6.222 5.835-6.222s5.836 2.035 5.836 6.222v3.498H225.25Zm5.896-12.246c-5.154 0-8.589 3.097-8.589 9.031v11.269h2.693v-5.549h11.67v5.549h2.873V46.174c0-5.935-3.436-9.031-8.647-9.031Zm-20.884 17.973h-6.558v-6.622h6.558c3.165 0 4.875 1.023 4.875 3.325 0 2.302-1.71 3.297-4.875 3.297Zm-.642-15.392c2.943 0 4.617 1.093 4.617 3.222 0 2.128-1.674 3.221-4.617 3.221h-5.916v-6.444h5.916v.001Zm4.742 7.324c1.58-.773 2.7-2.29 2.7-4.467 0-3.236-2.585-5.183-7.21-5.183h-9.02v20.045h9.595c5.085 0 7.699-1.976 7.699-5.412 0-2.663-1.494-4.353-3.764-4.983Zm-26.831-9.905c-2.956 0-5.395 1.204-6.657 3.355-1.034-2.093-3.243-3.355-6.256-3.355-3.013 0-5.108 1.175-6.285 3.154v-2.9h-2.693v20.046h2.873V45.457c0-4.043 2.307-5.763 5.509-5.763 2.943 0 4.905 1.691 4.905 5.361v12.387h2.872V45.456c0-4.042 2.238-5.763 5.394-5.763 2.897 0 5.02 1.692 5.02 5.362V57.44h2.693V44.97c0-5.162-2.812-7.828-7.375-7.828v.002Zm-42.359 12.246v-3.498c0-4.186 2.253-6.222 5.835-6.222s5.836 2.035 5.836 6.222v3.498h-11.671Zm5.896-12.246c-5.154 0-8.589 3.097-8.589 9.031v11.269h2.693v-5.549h11.67v5.549h2.873V46.174c0-5.935-3.436-9.031-8.647-9.031Zm-17.387.254v8.591h-11.492v-8.59h-2.872v20.044h2.872v-8.948h11.492v8.949h2.872V37.397h-2.872Zm-26.425 20.239c5.321 0 7.795-2.638 7.795-5.706 0-7.37-12.196-4.301-12.196-9.204 0-1.75 1.467-3.183 4.89-3.183 1.783 0 3.768.516 5.523 1.635l.949-2.294c-1.668-1.147-4.113-1.777-6.472-1.777-5.292 0-7.708 2.637-7.708 5.734 0 7.455 12.196 4.359 12.196 9.262 0 1.75-1.496 3.097-4.977 3.097-2.588 0-5.148-.975-6.644-2.323l-1.064 2.237c1.611 1.49 4.631 2.524 7.708 2.524v-.002Z'
      />
    </g >
    <defs >
      <clipPath id='a' >
        <path fill='#fff' d='M.168 0h279.664v91.797H.168z' />
      </clipPath >
    </defs >
  </svg >
)
export default ShambalaLogo