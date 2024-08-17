export const slideUp = {
initial: {
        x: "-100%",
        filter: "blur(12px)",
        opacity: 0,
    },
    open: (i) => ({
        x: "0%",
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 0.25 * i,
            ease: "easeIn",
        },
    }),
    closed: {
        x: "-100%",
        filter: "blur(10px)",
        scale: 0.8,
        opacity: 0,
        transition: { 
            duration: 0.3 
        },
    },
}

export const slideIn = {
initial: {
        y: "100%",
        filter: "blur(10px)",
        opacity: 0,
    },
    open: (i) => ({
        y: "0%",
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.7,
            delay: 0.2 * i,
            ease: "easeInOut",
        },
    }),
    closed: {
        x: "-100%",
        filter: "blur(10px)",
        scale: 0.8,
        opacity: 0,
        transition: { 
            duration: 0.3 
        },
    },
} 