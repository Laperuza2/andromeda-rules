import sys
import logging, re
import unittest

from mkdocs.exceptions import PluginError
from mkdocs.plugins import BasePlugin

import markdown
import mkdocs.plugins

log = logging.getLogger(__name__)
idx = 0
pageId = ''

def repl(m):
    global idx
    global pageId
    idx += 1
    return "<li id=\"" + pageId + "-" + str(idx) + "\">"

@mkdocs.plugins.event_priority(-100)
def on_page_content(html, page, **kwargs):
    global idx
    global pageId
    pageId = page.url
    if (len(pageId) > 0):
        pageId = pageId.rstrip(pageId[-1])
        pageId = pageId.replace('/', '_')
    else:
        pageId = ''
    idx = 0
    return re.sub(r'<li>', repl, html)
