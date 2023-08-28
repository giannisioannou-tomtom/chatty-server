import {IconBulbFilled, IconBulbOff, IconHelp, IconMarkdown, IconScreenshot} from "@tabler/icons-react"
import {useTranslation} from "next-i18next"
import {useTheme} from "next-themes"
import React, {useRef, useState} from "react"

import useClickAway from "@/components/Hooks/useClickAway"
import useSaveMarkdown from "@/components/Hooks/useSaveMarkdown"
import useScreenshot from "@/components/Hooks/useScreenshot"
import {FormLabel, FormText, Input, Select} from "@/components/Styled"
import {Conversation} from "@/types/chat"
import {FALLBACK_OPENAI_MODEL_ID, OpenAIModel, OpenAIModelID, OpenAIModels} from "@/types/openai"
import {OPENAI_API_MAX_TOKENS, OPENAI_DEFAULT_TEMPERATURE} from "@/utils/app/const"

interface Props {
  conversation: Conversation
  container: React.RefObject<HTMLDivElement>
  models: OpenAIModel[]
  onOpenReleaseNotes: () => void
  onUpdateConversation: (conversation: Conversation) => void
}

const ChatMenu = ({conversation, container, models, onUpdateConversation, onOpenReleaseNotes}: Props) => {
  const {t} = useTranslation("common")

  const {theme, setTheme} = useTheme()
  const {onSaveScreenshot} = useScreenshot(container)
  const {onSaveMarkdown} = useSaveMarkdown(conversation)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const temperature = conversation.temperature ?? OPENAI_DEFAULT_TEMPERATURE
  const modelId = conversation.modelId ?? FALLBACK_OPENAI_MODEL_ID
  const maxTokens = conversation.maxTokens ?? OPENAI_API_MAX_TOKENS
  const ref = useRef<HTMLDivElement>(null)

  useClickAway(ref, isMenuOpen, () => {
    setIsMenuOpen(false)
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    conversation.temperature = Number(event.target.value)
    onUpdateConversation(conversation)
  }

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    conversation.modelId = e.target.value as OpenAIModelID
    onUpdateConversation(conversation)
  }

  const handleMaxTokensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    conversation.maxTokens = Number(event.target.value)
    onUpdateConversation(conversation)
  }

  return (
    <div
      ref={ref}
      className={`fixed left-1/2 top-0 z-50 flex max-w-lg -translate-x-1/2 transform flex-col items-center justify-center rounded-b-lg border-x border-b border-gray-300 bg-gray-50 p-6 transition-all duration-500 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${
        isMenuOpen ? "translate-y-0 shadow-xl " : "-translate-y-full shadow-none"
      }`}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full">
        <FormLabel htmlFor="maxTokens" className="text-lg font-medium text-black dark:text-neutral-200">
          Conversation model
        </FormLabel>
        <div className="flex flex-col">
          <Select
            disabled={true}
            className="disabled:pointer-events-none disabled:text-gray-300"
            placeholder={t("Select a model")}
            value={modelId}
            onChange={handleModelChange}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.id === FALLBACK_OPENAI_MODEL_ID ? `Default (${model.name})` : model.name}
              </option>
            ))}
          </Select>
          <FormText>Coming soon: currently only the default model is supported...</FormText>
        </div>

        <div className="flex flex-col pt-2">
          <FormLabel htmlFor="temperature">Temperature</FormLabel>
          <FormText>
            Higher values means the model will take more risks or be more creative. Try 0 for more predictable answers
            and 1 for more creative ones.
          </FormText>
          <Input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={handleTemperatureChange}
            className="mt-2"
          />
          <FormText className="text-center">{temperature}</FormText>
        </div>

        <div className="flex flex-col">
          <FormLabel htmlFor="maxTokens" className="text-lg font-medium text-black dark:text-neutral-200">
            Response token limit
          </FormLabel>
          <FormText>The maximum number of tokens used to generate an answer.</FormText>
          <Input
            id="maxTokens"
            type="number"
            min="0"
            max={OpenAIModels[modelId].tokenLimit}
            value={maxTokens}
            onChange={handleMaxTokensChange}
          />
        </div>
      </div>

      <div className="absolute top-full">
        <div className="flex w-full flex-row justify-center rounded-b-lg border border-t-0 border-b-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-500 shadow dark:border-none dark:bg-[#444654] dark:text-neutral-200">
          <button
            className="cursor-pointer px-2 hover:opacity-50 focus:outline-none "
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <IconBulbFilled size={18} /> : <IconBulbOff size={18} />}
          </button>

          <button className="cursor-pointer px-2 hover:opacity-50 focus:outline-none" onClick={onOpenReleaseNotes}>
            <IconHelp size={18} />
          </button>

          <button
            className="w-fit rounded-b-lg bg-neutral-100 px-4 text-neutral-500 hover:opacity-50 focus:outline-none dark:border-none dark:bg-[#444654] dark:text-neutral-200"
            onClick={toggleMenu}
          >
            {conversation.modelId}
          </button>

          <button
            className="cursor-pointer px-2 hover:opacity-50 focus:outline-none"
            disabled={!conversation}
            onClick={onSaveScreenshot}
          >
            <IconScreenshot size={18} />
          </button>

          <button
            className="cursor-pointer px-2 hover:opacity-50 focus:outline-none"
            disabled={!conversation}
            onClick={onSaveMarkdown}
          >
            <IconMarkdown size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMenu