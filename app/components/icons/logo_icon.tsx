'use client'

import Link from "next/link";

const LogoIcon = ({className=""}:{className?:string})=>{
    return <Link href="/">
        <div className={className}>
            <svg viewBox="0 0 169 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M16 28H5.33333V20H16M32 20V16L30.2222 6H1.77778L0 16V20H1.77778V32H19.5556V20H26.6667V32H30.2222V20M30.2222 0H1.77778V4H30.2222V0Z" fill="white"/>
                <path d="M42.7461 18.4668L47.9121 18.3789C48.0423 18.3789 48.1497 18.4896 48.2344 18.7109C48.3255 18.9323 48.4134 19.1081 48.498 19.2383C48.6999 19.5508 49.0319 19.707 49.4941 19.707C49.9629 19.707 50.3405 19.5996 50.627 19.3848C50.9134 19.1634 51.0566 18.8802 51.0566 18.5352C51.0566 18.1901 50.9688 17.9557 50.793 17.832C50.6172 17.7018 50.4251 17.5781 50.2168 17.4609C50.0085 17.3372 49.6992 17.2428 49.2891 17.1777C48.8854 17.1126 48.6641 17.0736 48.625 17.0605H48.6445L48.0879 16.9141C47.7298 16.849 47.4303 16.7773 47.1895 16.6992C45.6335 16.2826 44.5072 15.7585 43.8105 15.127C43.1204 14.4954 42.7754 13.6458 42.7754 12.5781C42.7754 11.8034 42.9186 11.1068 43.2051 10.4883C43.4915 9.86979 43.8659 9.36523 44.3281 8.97461C45.6628 7.84831 47.5052 7.28516 49.8555 7.28516C51.724 7.28516 53.1921 7.6237 54.2598 8.30078H54.25C54.9336 8.79557 55.4023 9.28385 55.6562 9.76562C55.9102 10.2409 56.0697 10.8301 56.1348 11.5332L55.8809 11.7871C54.1686 11.8522 52.6517 11.8848 51.3301 11.8848C50.9329 11.8848 50.6953 11.7676 50.6172 11.5332C50.5846 11.4355 50.5488 11.3379 50.5098 11.2402C50.4186 11.0059 50.1257 10.8887 49.6309 10.8887H49.5918C49.2077 10.8887 48.8789 10.9798 48.6055 11.1621C48.332 11.3379 48.1921 11.5104 48.1855 11.6797C48.1855 11.849 48.2214 11.9889 48.293 12.0996C48.3711 12.2103 48.4525 12.2982 48.5371 12.3633C48.6217 12.4284 48.752 12.4967 48.9277 12.5684C49.1035 12.6335 49.2337 12.679 49.3184 12.7051C49.4095 12.7246 49.5495 12.7604 49.7383 12.8125L50.0801 12.9004C50.2168 12.9395 50.6139 13.0371 51.2715 13.1934C51.9355 13.3496 52.4889 13.4993 52.9316 13.6426V13.6328C54.3184 14.1016 55.2624 14.6875 55.7637 15.3906C56.2715 16.0872 56.5254 16.901 56.5254 17.832C56.5254 20.3125 55.0443 21.9206 52.082 22.6562C51.2227 22.8711 50.3047 23.0241 49.3281 23.1152C48.1302 23.1152 46.9453 22.9395 45.7734 22.5879C44.6016 22.2363 43.8171 21.6634 43.4199 20.8691C43.153 20.485 42.974 20.1335 42.8828 19.8145C42.7917 19.4889 42.7168 19.0365 42.6582 18.457C42.6777 18.4635 42.707 18.4668 42.7461 18.4668ZM70.041 16.0059L70.0508 19.043V20.8301L70.0605 22.5098H64.5137L64.5039 17.5098L64.5332 16.4258C64.5332 15.8333 64.4453 15.3939 64.2695 15.1074C64.1003 14.8145 63.8887 14.668 63.6348 14.668C63.153 14.668 62.8535 14.9089 62.7363 15.3906C62.6517 15.7292 62.6094 16.1719 62.6094 16.7188V17.9688L62.6191 18.3789V22.5L59.8164 22.5098H57.0332L57.0234 14.8535V7.1875C58.332 7.17448 60.2168 7.16797 62.6777 7.16797L62.6875 12.0898C63.1432 11.5755 63.6966 11.1654 64.3477 10.8594C65.0052 10.5534 65.6042 10.4004 66.1445 10.4004C66.6849 10.4004 67.2155 10.5306 67.7363 10.791C68.2572 11.0514 68.6868 11.3965 69.0254 11.8262C69.3118 12.2754 69.556 12.819 69.7578 13.457C69.9596 14.0885 70.0605 14.6159 70.0605 15.0391L70.041 16.0059ZM85.4512 16.5918C85.4382 16.6569 85.4316 16.696 85.4316 16.709V16.7871C85.4121 17.8613 85.1647 18.8281 84.6895 19.6875H84.6992C84.0352 20.7031 83.1074 21.4844 81.916 22.0312C80.7311 22.5781 79.5625 22.8516 78.4102 22.8516C77.2578 22.8516 76.3008 22.7376 75.5391 22.5098C74.7839 22.2884 74.084 21.9629 73.4395 21.5332C72.7949 21.1035 72.3164 20.6901 72.0039 20.293C71.2617 19.3555 70.8906 18.0306 70.8906 16.3184C70.8906 16.2598 70.9004 16.2109 70.9199 16.1719V16.0156C70.9004 15.9896 70.8906 15.9635 70.8906 15.9375L70.9102 15.8301H70.9004C71.0241 14.6908 71.265 13.9421 71.623 13.584C71.623 13.5124 71.6686 13.431 71.7598 13.3398V13.3496L71.9062 13.1152C72.6745 12.1322 73.5534 11.4583 74.543 11.0938L74.8848 10.9668C75.3145 10.7585 75.9167 10.6022 76.6914 10.498L77.0039 10.4688C77.0495 10.4622 77.1406 10.4557 77.2773 10.4492C77.4206 10.4427 77.5215 10.4297 77.5801 10.4102L78 10.4199C78.0195 10.4134 78.0423 10.4102 78.0684 10.4102C78.0944 10.4102 78.1237 10.4134 78.1562 10.4199L78.1465 10.4102C78.1855 10.4297 78.2441 10.4395 78.3223 10.4395C78.3483 10.4134 78.3939 10.4004 78.459 10.4004C79.8717 10.4004 81.0729 10.6901 82.0625 11.2695L82.2578 11.3574C84.3867 12.3796 85.4512 14.1243 85.4512 16.5918ZM79.377 16.6504C79.3509 15.3548 79.1654 14.4792 78.8203 14.0234C78.6771 13.8346 78.5013 13.7402 78.293 13.7402C78.0911 13.7402 77.9121 13.8607 77.7559 14.1016C77.5996 14.3359 77.4727 14.707 77.375 15.2148C77.2839 15.7227 77.2383 16.1751 77.2383 16.5723C77.2383 16.9629 77.2546 17.3014 77.2871 17.5879C77.3262 17.8678 77.3815 18.1673 77.4531 18.4863C77.5247 18.7988 77.6354 19.0625 77.7852 19.2773C77.9349 19.4857 78.1042 19.5898 78.293 19.5898C79.0156 19.5898 79.377 18.61 79.377 16.6504ZM86.3398 10.8203L88.8594 10.8105H91.4082C91.5319 11.0645 91.6426 11.2793 91.7402 11.4551L92.1113 12.1387C92.8014 11.5072 93.4362 11.0612 94.0156 10.8008C94.6016 10.5339 95.2396 10.4004 95.9297 10.4004C96.6198 10.4004 97.2383 10.5273 97.7852 10.7812C98.7487 11.2305 99.4616 11.9922 99.9238 13.0664C100.393 14.1406 100.627 15.2865 100.627 16.5039C100.627 16.6602 100.614 16.8034 100.588 16.9336C100.484 18.0664 100.285 19.0072 99.9922 19.7559C99.7057 20.498 99.1979 21.2044 98.4688 21.875V21.8652C97.8177 22.4251 97.1992 22.7051 96.6133 22.7051C96.444 22.7832 96.2715 22.8223 96.0957 22.8223C95.9264 22.8223 95.6855 22.7995 95.373 22.7539C95.0671 22.7148 94.8652 22.6693 94.7676 22.6172C93.8626 22.4219 93.1302 22.0378 92.5703 21.4648L92.1992 21.4746C92.2578 21.8457 92.2871 22.1647 92.2871 22.4316L92.2773 22.6074V25.5957L89.3086 25.6055H86.3496L86.3398 18.2129V10.8203ZM94.5137 17.5879L94.5625 16.9727C94.556 16.9661 94.5527 16.9531 94.5527 16.9336C94.5527 16.9141 94.556 16.8978 94.5625 16.8848V16.7188C94.5625 16.3997 94.5495 16.1361 94.5234 15.9277L94.4648 15.5176C94.4518 15.4525 94.416 15.2539 94.3574 14.9219C94.2012 14.082 93.8724 13.6621 93.3711 13.6621C92.5638 13.6621 92.1602 14.7233 92.1602 16.8457C92.1602 18.0111 92.3392 18.8607 92.6973 19.3945C92.8665 19.6419 93.0749 19.7949 93.3223 19.8535C93.9993 19.7949 94.3965 19.0397 94.5137 17.5879ZM101.77 7.16797L104.25 7.1582C105.005 7.1582 106.177 7.16471 107.766 7.17773V22.5098H101.789L101.77 7.16797ZM114.084 10.5273C114.377 10.4427 114.689 10.4004 115.021 10.4004C115.354 10.4004 115.669 10.4134 115.969 10.4395L116.379 10.4785C117.023 10.5371 117.518 10.612 117.863 10.7031V10.6934L118.068 10.7812C119.436 11.2044 120.5 11.849 121.262 12.7148V12.7051C121.438 12.9134 121.652 13.2292 121.906 13.6523C122.167 14.069 122.297 14.3587 122.297 14.5215L122.375 14.7852L122.424 15.0684C122.548 15.5046 122.609 15.8691 122.609 16.1621C122.609 16.4551 122.613 16.6797 122.619 16.8359H114.572V17.1582C114.611 17.3079 114.631 17.4642 114.631 17.627C114.631 17.7897 114.631 17.9199 114.631 18.0176C114.637 18.1087 114.647 18.1999 114.66 18.291C114.673 18.3757 114.68 18.4473 114.68 18.5059C114.686 18.5579 114.702 18.623 114.729 18.7012C114.755 18.7728 114.768 18.8216 114.768 18.8477C114.774 18.8737 114.794 18.9258 114.826 19.0039C114.865 19.082 114.895 19.1569 114.914 19.2285C114.94 19.2936 114.986 19.3587 115.051 19.4238V19.4141L115.158 19.6191C115.282 19.7559 115.451 19.8535 115.666 19.9121C116.024 19.834 116.265 19.6484 116.389 19.3555C116.519 19.0625 116.626 18.6979 116.711 18.2617C116.945 18.1966 117.277 18.1641 117.707 18.1641L118.957 18.1934H122.561C122.482 18.9876 122.248 19.7168 121.857 20.3809H121.867C121.529 20.9147 121.001 21.3737 120.285 21.7578C118.26 22.4674 116.962 22.8223 116.389 22.8223C116.285 22.8223 116.2 22.8158 116.135 22.8027H115.91L115.822 22.8125H115.734C115.682 22.8125 115.617 22.806 115.539 22.793C115.474 22.832 115.396 22.8516 115.305 22.8516L114.455 22.7539C114.41 22.7734 114.315 22.7832 114.172 22.7832C114.035 22.7832 113.671 22.6953 113.078 22.5195V22.5293L112.844 22.4609L112.609 22.3828C111.633 22.0964 110.796 21.5951 110.1 20.8789C109.403 20.1562 108.957 19.3164 108.762 18.3594C108.742 18.2422 108.706 18.0664 108.654 17.832C108.602 17.5911 108.576 17.4284 108.576 17.3438V16.875C108.576 16.7643 108.579 16.6797 108.586 16.6211V16.4746C108.586 15.0944 108.996 13.903 109.816 12.9004C110.637 11.8913 111.737 11.1816 113.117 10.7715L113.352 10.7031C113.697 10.6445 113.944 10.5827 114.094 10.5176L114.084 10.5273ZM117.004 15.5469L117.209 15.4199C117.098 14.7168 116.994 14.2676 116.896 14.0723C116.799 13.8704 116.704 13.6979 116.613 13.5547C116.444 13.2812 116.219 13.1445 115.939 13.1445C115.666 13.1445 115.432 13.2812 115.236 13.5547C114.891 14.0365 114.673 14.7135 114.582 15.5859C114.999 15.5599 115.383 15.5469 115.734 15.5469H117.004ZM127.111 10.8105L130.188 10.8008C130.266 11.224 130.363 11.8457 130.48 12.666C130.598 13.4863 130.682 14.0267 130.734 14.2871L130.861 14.9316H131.203L131.584 13.0762C131.597 13.0111 131.659 12.6693 131.77 12.0508C131.88 11.4323 131.968 11.0156 132.033 10.8008H138.156L136.652 14.0234L136.486 14.4141C136.441 14.5247 136.34 14.7233 136.184 15.0098C136.034 15.2897 135.959 15.4492 135.959 15.4883L135.695 15.9766C136.06 16.8685 136.473 17.9134 136.936 19.1113C137.404 20.3027 137.863 21.4355 138.312 22.5098H132.111C131.825 21.3574 131.421 19.5964 130.9 17.2266H130.549C130.523 17.3633 130.458 17.7018 130.354 18.2422C130.249 18.7826 130.174 19.1895 130.129 19.4629L129.953 20.5176C129.875 21.0059 129.755 21.6732 129.592 22.5195H129.494C128.413 22.5065 127.616 22.5 127.102 22.5H126.115L125.119 22.5098H123.42C123.511 22.2233 123.615 21.9368 123.732 21.6504L123.918 21.1816C123.996 20.9733 124.191 20.4232 124.504 19.5312C124.816 18.6393 125.109 17.8939 125.383 17.2949L125.891 15.957C125.682 15.4427 125.409 14.6908 125.07 13.7012H125.08L124.914 13.2031C124.81 12.8906 124.663 12.4642 124.475 11.9238C124.286 11.377 124.162 11.0059 124.104 10.8105H127.111ZM145.598 7.08984L145.607 9.76562H139.592C139.592 9.14062 139.585 8.69466 139.572 8.42773L139.562 7.10938L145.598 7.08984ZM139.465 7.10938L139.562 7.01172V7.10938H139.465ZM145.637 19.4043L145.646 19.4922L145.656 20.957C145.656 21.224 145.643 21.543 145.617 21.9141C145.591 22.2852 145.568 22.4772 145.549 22.4902L145.373 22.5098H141.818L141.408 22.5488C140.393 22.5488 139.774 22.5358 139.553 22.5098V22.4414L139.543 22.2559V21.8164C139.543 20.5339 139.562 19.4694 139.602 18.623L139.709 11.1035V10.8105L140.471 10.8008L140.637 10.8105H140.92L141.164 10.8203L141.291 10.8105H141.994L142.141 10.8008L145.471 10.8398C145.497 10.8333 145.516 10.8301 145.529 10.8301C145.542 10.8301 145.549 10.8496 145.549 10.8887L145.559 11.8164C145.565 12.4349 145.578 13.265 145.598 14.3066C145.617 15.3418 145.627 16.0742 145.627 16.5039L145.617 17.7246V18.2422L145.646 18.7598V19.0625C145.646 19.069 145.643 19.082 145.637 19.1016V19.4043ZM148.02 11.0449L148 10.2637C148 9.95117 148.107 9.4987 148.322 8.90625C148.544 8.3138 148.84 7.85482 149.211 7.5293C149.556 7.2819 150.243 7.1582 151.271 7.1582C152.307 7.1582 153.397 7.16797 154.543 7.1875V9.26758H154.211C153.977 9.26758 153.807 9.26432 153.703 9.25781C153.189 9.44661 152.932 9.98698 152.932 10.8789C152.945 10.918 152.951 10.9473 152.951 10.9668C152.951 10.9798 152.948 10.9993 152.941 11.0254V11.2988C153.15 11.3379 153.391 11.3574 153.664 11.3574H154.104C154.273 11.3574 154.406 11.3607 154.504 11.3672V14.3652H152.912V22.5098L150.871 22.5195C150.266 22.5195 149.305 22.513 147.99 22.5V14.3555H146.877L146.867 12.8809V11.416H148.02V11.0449ZM157.473 23.8574C158.078 23.6491 158.381 23.0599 158.381 22.0898C158.381 21.7253 158.257 21.1491 158.01 20.3613L157.854 19.873C157.092 17.4316 156.138 14.4173 154.992 10.8301H157.971L160.91 10.8203L161.35 13.3496C161.382 13.6296 161.434 14.0267 161.506 14.541C161.577 15.0553 161.63 15.4427 161.662 15.7031L162.609 10.8203H168.381V10.8008L168.576 10.8203L168.527 11.0156H168.508L165.93 18.1641C165.663 18.8346 165.464 19.3978 165.334 19.8535C165.204 20.3027 165.057 20.7259 164.895 21.123C164.732 21.5202 164.445 22.2982 164.035 23.457C163.632 24.6224 163.244 25.5371 162.873 26.2012C162.287 27.1973 161.353 27.7376 160.07 27.8223L159.152 27.832L158.361 27.8711C158.212 27.8711 158.085 27.8613 157.98 27.8418C157.935 27.8548 157.867 27.8613 157.775 27.8613L157.18 27.832L156.799 27.8613C156.766 27.8613 156.685 27.8548 156.555 27.8418C156.281 27.8418 156.008 27.8418 155.734 27.8418L155.549 27.3438C155.536 27.3047 155.529 27.2526 155.529 27.1875C155.529 27.1289 155.533 27.0866 155.539 27.0605V26.9922L155.549 26.8945V25.7812C155.549 25.013 155.546 24.4434 155.539 24.0723C155.63 24.0592 155.728 24.0527 155.832 24.0527C155.943 24.0527 156.031 24.0625 156.096 24.082C156.187 24.0625 156.307 24.0527 156.457 24.0527H156.535C156.587 24.0202 156.704 23.9909 156.887 23.9648C157.069 23.9388 157.209 23.9128 157.307 23.8867C157.404 23.8607 157.46 23.8477 157.473 23.8477V23.8574Z" fill="white"/>
            </svg>
        </div>
    </Link>
}

export default LogoIcon;