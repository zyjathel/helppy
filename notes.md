
# Notes

> I know there is a lot more for me to learn. Please let me know if you have any feedbacks.

## State

Overall I try to separate business logic (state + action/reducer) from mark up.

## Typescript

I tried to show some examples of more advanced usage of TS:

- discriminated union
- usage of `as` when there is not a better way to narrow down the type
- computed types `Omit/JSX.IntrinsicElements["button]` etc
- generics, see `store/utils:shuffle` where I added type annotation for a piece of utility JS code copied from StackOverflow

## React

I tried to show example of most common hooks: `useState/useEffect`. I admit a way to improve the current code base is to write some customized hook, e.g. the `UsernameInput` and `Cheat` component share some logic.

And improvements can also be done on how styling (tailwindcss classes) are used. It is better to have some base components that share some base styles. Currently I am repeating the classnames for most cases.


## UX

There are a lot that can be improvement besides than making it look better in general:
- adding some grayscale to disable buttons
- add some shortcuts
- more stats
