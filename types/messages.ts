export interface Source {
  url: string;
  content: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  browserLogs?: Array<{ memory: string; goal: string; url: string }>;
}

export type BrowserAction =
  | { go_to_url: { url: string } }
  | { input_text: { index: number; text: string } }
  | { click_element: { index: number } }
  | { extract_content: { include_links: boolean } }
  | { done: { text: string } };

export type BrowserState = {
  evaluation_previous_goal: string;
  memory: string;
  next_goal: string;
};

export type BrowserResult = {
  is_done: boolean;
  extracted_content?: string;
  include_in_memory?: boolean;
};

export type BrowserHistoryEntry = {
  model_output: {
    current_state: BrowserState;
    action: BrowserAction[];
  };
  result: BrowserResult[];
  state?: {
    tabs?: { page_id: number; url: string; title: string }[];
    interacted_element?: (string | null)[];
    url?: string;
    title?: string;
  };
};

export type BrowserResponse = {
  status: string;
  result: {
    status: string;
    result: {
      history: BrowserHistoryEntry[];
    };
  };
};
