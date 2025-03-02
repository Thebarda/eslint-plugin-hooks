/**
 * @fileoverview A simple organizer for ordering hooks.
 * @author Hiukky
 */
'use strict'

import { RuleTester, Rule, Linter } from 'eslint'
import * as rule from '@rules/sort'

const Tester = new RuleTester()

const parserOptions: Linter.ParserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const options = [
  {
    groups: rule.DEFAULT_GROUPS,
  },
]

Tester.run('hooks/sort', rule as unknown as Rule.RuleModule, {
  valid: [
    {
      code: `
      import { useState, useEffect, useReducer } from 'react'

      export function ComponentA() {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }
     `,
      parserOptions,
      options,
    },
    {
      code: `
      import { useState, useEffect, useReducer,useCallback } from 'react'

      function ComponentA() {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }

      const ComponentB = () => {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }

      export function ComponentC() {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }

      export const ComponentD = () => {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }
     `,
      parserOptions,
      options,
    },
    {
      code: `
      export default function ComponentE() {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }
     `,
      parserOptions,
      options,
    },
    {
      code: `
      function ComponentA() {
        const [todos, dispatch] = useReducer(todosReducer)

        const [count, setCount] = useState(0)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        },[a, b])

        useEffect(() => {
          document.title = 'Hello'
        }, [])
      }

      export default ComponentA
     `,
      parserOptions,
      options,
    },
  ],
  invalid: [
    {
      code: `
      import { useState, useEffect, useReducer } from 'react'

      export function ComponentA() {
        useEffect(() => {
          document.title = 'Hello'
        }, [])

        const [todos, dispatch] = useReducer(todosReducer)

        const memoizedCallback = useCallback(() => {
          doSomething(a, b)
        }, [a, b])
      }
      `,
      errors: [
        {
          message:
            'Non-matching declaration order. useEffect comes after useReducer.',
        },
        {
          message:
            'Non-matching declaration order. useReducer comes before useCallback.',
        },
        {
          message:
            'Non-matching declaration order. useCallback comes before useEffect.',
        },
      ],
      parserOptions,
      options,
    },
    {
      code: `
      import { useState, useEffect, useContext,useRef } from 'react'

      export function ComponentA() {
        const [count, setCount] = useState(0)

        const locale = useContext(LocaleContext)
      }

      export function ComponentB() {
        useEffect(() => {
          console.log('Hello')
        }, [])

        const countRef = useRef(0)
      }
      `,
      errors: [
        {
          message:
            'Non-matching declaration order. useState comes after useContext.',
        },
        {
          message:
            'Non-matching declaration order. useContext comes before useState.',
        },
        {
          message:
            'Non-matching declaration order. useEffect comes after useRef.',
        },
        {
          message:
            'Non-matching declaration order. useRef comes before useEffect.',
        },
      ],
      parserOptions,
      options,
    },
  ],
})
