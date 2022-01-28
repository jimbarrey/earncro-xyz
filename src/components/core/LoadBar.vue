<template>
    <div class="inset-0 bg-sushi-200 overflow-hidden">
        <div
            id="bar1"
            class="absolute bg-sushi-500 m-0 top-0 -left-full w-full h-full"
        ></div>
        <div
            id="bar2"
            class="absolute bg-sushi-500 m-0 top-0 -left-full w-full h-full"
        ></div>
    </div>
</template>

<style scoped>
#bar1 {
    animation: move1 3s linear infinite, grow1 3s linear infinite;
}
#bar2 {
    animation: move2 3s linear infinite, grow2 3s linear infinite;
}
@keyframes move1 {
    0% {
        left: -100%;
    }
    10% {
        left: 0%;
    }
    65% {
        left: 80%;
    }
    100% {
        left: 100%;
    }
}
@keyframes grow1 {
    0% {
        transform: scaleX(0.8);
    }
    50% {
        transform: scaleX(0.9);
    }
    75% {
        transform: scaleX(0.1);
    }
    100% {
        transform: scaleX(0.1);
    }
}
@keyframes move2 {
    0% {
        left: -100%;
    }
    50% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}
@keyframes grow2 {
    0% {
        transform: scaleX(0.8);
    }
    50% {
        transform: scaleX(0.9);
    }
    75% {
        transform: scaleX(0.8);
    }
    100% {
        transform: scaleX(0.7);
    }
}
</style>
